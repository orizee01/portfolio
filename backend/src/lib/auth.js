import { timingSafeEqual } from "node:crypto";

export function authorized(req) {
  const expected = process.env.UPLOAD_TOKEN;
  const given = (req.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
