import { Redis } from '@upstash/redis'

let redis: Redis | null = null

function getRedis(): Redis | null {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN

    if (!url || !token) {
      console.warn('⚠️  Upstash Redis credentials not set — using in-memory fallback')
      return null
    }

    try {
      redis = new Redis({ url, token })
      console.log('✅ Upstash Redis client initialized')
    } catch (err) {
      console.warn('⚠️  Upstash Redis init failed — using in-memory fallback')
      return null
    }
  }
  return redis
}

export async function checkRedisConnection(): Promise<{ connected: boolean; latency: number }> {
  const start = Date.now()
  try {
    const r = getRedis()
    if (!r) return { connected: false, latency: 0 }
    const pong = await r.ping()
    return { connected: pong === 'PONG', latency: Date.now() - start }
  } catch {
    return { connected: false, latency: Date.now() - start }
  }
}

// In-memory fallback when Redis is unavailable
const memoryStore = new Map<string, { value: string; expiry: number }>()

function cleanExpired() {
  const now = Date.now()
  for (const [key, entry] of memoryStore) {
    if (entry.expiry <= now) memoryStore.delete(key)
  }
}

export async function cacheSet(key: string, value: string, ttlSeconds: number = 3600): Promise<void> {
  try {
    const r = getRedis()
    if (r) {
      await r.set(key, value, { ex: ttlSeconds })
      return
    }
  } catch (err) {
    console.warn('Redis SET failed, using in-memory fallback')
  }
  memoryStore.set(key, { value, expiry: Date.now() + ttlSeconds * 1000 })
}

export async function cacheGet(key: string): Promise<string | null> {
  try {
    const r = getRedis()
    if (r) {
      const val = await r.get<string>(key)
      return val ?? null
    }
  } catch (err) {
    console.warn('Redis GET failed, using in-memory fallback')
  }
  cleanExpired()
  const entry = memoryStore.get(key)
  if (entry && entry.expiry > Date.now()) return entry.value
  if (entry) memoryStore.delete(key)
  return null
}

export async function cacheDel(key: string): Promise<void> {
  try {
    const r = getRedis()
    if (r) {
      await r.del(key)
      return
    }
  } catch (err) {
    console.warn('Redis DEL failed, using in-memory fallback')
  }
  memoryStore.delete(key)
}
