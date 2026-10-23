import { createHmac, timingSafeEqual } from "node:crypto";

// Stateless admin sessions: base64url(payload).base64url(HMAC-SHA256(payload, SESSION_SECRET)).
// Changing SESSION_SECRET logs every session out.
const SESSION_DAYS = 7;

const sign = (data) => createHmac("sha256", process.env.SESSION_SECRET).update(data).digest("base64url");

export function createSession(username) {
  const payload = Buffer.from(
    JSON.stringify({ sub: username, exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 })
  ).toString("base64url");
  return { token: `${payload}.${sign(payload)}`, expiresInDays: SESSION_DAYS };
}

// Returns the session payload, or null when the token is missing, forged or expired.
export function verifySession(token) {
  if (!process.env.SESSION_SECRET || typeof token !== "string") return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (data.sub !== process.env.ADMIN_USERNAME || !(data.exp > Date.now())) return null;
    return data;
  } catch {
    return null;
  }
}
