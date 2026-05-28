// Simple in-memory rate limiter. Resets on server restart.
// Keyed by IP; entries older than WINDOW_MS are pruned on each call.
const WINDOW_MS = 60_000  // 1 minute
const MAX_HITS  = 30      // max requests per window per IP

const store = new Map()

export function rateLimit(ip) {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    store.set(ip, { windowStart: now, hits: 1 })
    return { limited: false }
  }

  entry.hits += 1
  if (entry.hits > MAX_HITS) return { limited: true }
  return { limited: false }
}
