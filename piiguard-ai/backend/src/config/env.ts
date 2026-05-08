import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  JWT_SECRET: z.string().min(16),
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  ENCRYPTION_KEY: z.string().min(32),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
  if (process.env.NODE_ENV === 'production') {
    process.exit(1)
  }
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL || '',
  DIRECT_URL: process.env.DIRECT_URL || '',
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || '',
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || '',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me_in_prod',
  PORT: parseInt(process.env.PORT || '3001', 10),
  NODE_ENV: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'piiguard_aes256_key_32chars_long!',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
}
