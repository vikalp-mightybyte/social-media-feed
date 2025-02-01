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
  COGNITO_USER_POOL_ID: z.string(),
  COGNITO_WEB_CLIENT_ID: z.string(),
});

// Parse and validate environment variables
const envParse = envSchema.safeParse({
  API_SERVER_PORT: process.env.API_SERVER_PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
  COGNITO_WEB_CLIENT_ID: process.env.COGNITO_WEB_CLIENT_ID,
});

if (!envParse.success) {
  console.error('❌ Invalid environment variables:', envParse.error.format());
  throw new Error('Invalid environment variables');
}

const config = envParse.data;
export default config;
