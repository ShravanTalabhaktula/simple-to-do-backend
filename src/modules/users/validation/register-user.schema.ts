import { z } from 'zod';

export const registerUserSchema = z.object({
   body: z.object({
    username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters long')
    .max(50, 'Username must be at most 50 characters long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

    firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(100, 'First name must be at most 100 characters long'),

    lastName: z
    .string()
    .trim()
    .max(100, 'Last name must be at most 100 characters long')
    .optional(),
    
    email: z
    .email('Invalid email address')
    .max(255, 'Email must be at most 255 characters long')
    .transform(email => email.trim().toLowerCase()),
    
    password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be at most 100 characters long')
   })
});