import { Router } from "express";
import { timingSafeEqual } from "node:crypto";
import { adminConfigured, authorized } from "../lib/auth.js";
import { verifyPassword } from "../lib/password.js";
import { createSession } from "../lib/session.js";
import { createRateLimiter } from "../lib/rateLimit.js";

const WINDOW_MS = 15 * 60 * 1000;
const isLimited = createRateLimiter({ windowMs: WINDOW_MS, max: 10 });

const sameText = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

const router = Router();

router.post("/login", async (req, res) => {
  if (!adminConfigured()) {
    console.error("Admin login misconfigured: set ADMIN_USERNAME, ADMIN_PASSWORD_HASH and SESSION_SECRET");
    return res.status(503).json({ error: "Admin login is not configured." });
  }
  if (isLimited(req.ip)) {
    res.set("Retry-After", String(WINDOW_MS / 1000));
    return res.status(429).json({ error: "Too many login attempts. Try again in 15 minutes." });
  }

  const { username, password } = req.body || {};
  if (typeof username !== "string" || typeof password !== "string" || password.length > 200) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  // Always run the password check so a wrong username takes as long as a wrong password.
  const passwordOk = await verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);
  // Usernames are not case-sensitive (phones like to capitalise the first letter).
  if (!passwordOk || !sameText(username.trim().toLowerCase(), process.env.ADMIN_USERNAME.toLowerCase())) {
    return res.status(401).json({ error: "Wrong username or password." });
  }

  res.set("Cache-Control", "no-store");
  res.json({ ok: true, username: process.env.ADMIN_USERNAME, ...createSession(process.env.ADMIN_USERNAME) });
});

// Lets the frontend check whether a stored session is still valid.
router.get("/me", (req, res) => {
  res.set("Cache-Control", "no-store");
  if (!authorized(req)) return res.status(401).json({ admin: false });
  res.json({ admin: true, username: process.env.ADMIN_USERNAME });
});

export default router;
