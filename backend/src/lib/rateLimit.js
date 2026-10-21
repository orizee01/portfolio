// Best-effort in-memory limiter (per instance, resets on restart / cold start).
export function createRateLimiter({ windowMs, max }) {
  const hits = new Map();

  return function isLimited(key) {
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);

    if (hits.size > 1000) {
      for (const [k, times] of hits) {
        if (times.every((t) => now - t >= windowMs)) hits.delete(k);
      }
    }
    return recent.length > max;
  };
}
