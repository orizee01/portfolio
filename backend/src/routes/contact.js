import { Router } from "express";
import { createRateLimiter } from "../lib/rateLimit.js";
import { saveMessage, messageDriver } from "../lib/messages.js";

const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const isLimited = createRateLimiter({ windowMs: WINDOW_MS, max: 5 });

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
  if (messageDriver()) {
    try {
      await saveMessage({ name, email, message });
      saved = true;
    } catch (error) {
      console.error("Saving contact message failed:", error);
    }
  }

  const emailed = emailConfigured && (await sendEmail({ apiKey, to, from, name, email, message }));

  if (!saved && !emailed) {
    return res.status(502).json({ error: "Could not send your message. Please try again later." });
  }
  res.json({ ok: true });
});

// Returns true when Resend accepted the email; failures are logged, never thrown.
async function sendEmail({ apiKey, to, from, name, email, message }) {
  // Strip control characters (incl. CR/LF) from values used in the subject header.
  const subjectName = name.replace(/[\u0000-\u001f\u007f]/g, " ");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New contact message from ${subjectName}`,
        html: `
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\r?\n/g, "<br />")}</p>
        `,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
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
