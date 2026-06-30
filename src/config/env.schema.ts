import { z } from 'zod';

export const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    DATABASE_URL: z.url().refine(url => url.startsWith('postgres://') || url.startsWith('postgresql://'), {
        message: "DATABASE_URL must start with 'postgres://' or 'postgresql://'"
    }),
});

export type Env = z.infer<typeof envSchema>;