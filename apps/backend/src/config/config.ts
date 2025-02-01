import dotenv from 'dotenv';
import { resolve } from 'path';
import { z } from 'zod';

dotenv.config({
  path: resolve(process.cwd(), '.env'),
});

// Define and validate environment variables schema
const envSchema = z.object({
  API_SERVER_PORT: z.string().transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string().url(),
});

// Parse and validate environment variables
const envParse = envSchema.safeParse({
  API_SERVER_PORT: process.env.API_SERVER_PORT,
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!envParse.success) {
  console.error('❌ Invalid environment variables:', envParse.error.format());
  throw new Error('Invalid environment variables');
}

const config = envParse.data;
export default config;
