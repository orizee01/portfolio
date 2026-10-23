import { verifySession } from "./session.js";

export function adminConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD_HASH && process.env.SESSION_SECRET);
}

// True when the request carries a valid admin session ("Authorization: Bearer <token>").
export function authorized(req) {
  const token = (req.get("authorization") || "").replace(/^Bearer\s+/i, "");
  return Boolean(token && verifySession(token));
}
