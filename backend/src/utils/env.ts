import { config } from 'dotenv'
import z from 'zod'
config()

const envSchema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse({ ...process.env })
