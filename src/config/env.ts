import dotenv from 'dotenv';
import { envSchema } from './env.schema.js'

dotenv.config();

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('Invalid environment variables:', parsedEnv.error.format());
    process.exit(1);
}

export const env = {
    port: parsedEnv.data.PORT,
    nodeEnv: parsedEnv.data.NODE_ENV,
    databaseUrl: parsedEnv.data.DATABASE_URL,
};