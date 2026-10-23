import { Router } from "express";
import { createRateLimiter } from "../lib/rateLimit.js";
import { saveMessage, messageDriver } from "../lib/messages.js";
import { contactEmail } from "../lib/contactEmail.js";

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const isLimited = createRateLimiter({ windowMs: WINDOW_MS, max: 5 });

const router = Router();

router.post("/", async (req, res) => {
  const apiKey = process.env.PORTFOLIO_RESEND_API_KEY || process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  const emailConfigured = Boolean(apiKey && to);

  if (!emailConfigured && !messageDriver()) {
    console.error("Contact service misconfigured: no Resend settings and no message storage");
    return res.status(500).json({ error: "Contact service is not configured." });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};

  // Honeypot: real users never fill this; pretend success so bots move on.
  if (typeof body.website === "string" && body.website.trim()) {
    return res.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return res.status(400).json({ error: "One of the fields is too long." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (isLimited(req.ip)) {
    res.set("Retry-After", String(WINDOW_MS / 1000));
    return res.status(429).json({ error: "Too many messages. Please try again later." });
  }

  // Save first so the message reaches the inbox page even if the email fails.
  let saved = false;
  let receivedAt = new Date();
  if (messageDriver()) {
    try {
      receivedAt = new Date((await saveMessage({ name, email, message })).createdAt);
      saved = true;
    } catch (error) {
      console.error("Saving contact message failed:", error);
    }
  }

  const emailed = emailConfigured && (await sendEmail({ apiKey, to, from, name, email, message, receivedAt }));

  if (!saved && !emailed) {
    return res.status(502).json({ error: "Could not send your message. Please try again later." });
  }
  res.json({ ok: true });
});

// Returns true when Resend accepted the email; failures are logged, never thrown.
async function sendEmail({ apiKey, to, from, name, email, message, receivedAt }) {
  try {
    const { subject, html, text } = contactEmail({ name, email, message, receivedAt });
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      // Show a friendly sender name, unless RESEND_FROM_EMAIL already has one ("Name <addr>").
      body: JSON.stringify({
        from: from.includes("<") ? from : `Portfolio contact form <${from}>`,
        to: [to],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      console.error("Resend error:", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Sending contact email failed:", error);
    return false;
  }
}

export default router;
