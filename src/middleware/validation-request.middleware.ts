import type { RequestHandler } from 'express';
import { z } from 'zod';
import { ValidationError } from '../shared/errors/validation-error.js';

const requestSchema = z.object({
    body: z.unknown().optional(),
    params: z.unknown().optional(),
    query: z.unknown().optional(),
});

type RequestSchema = z.ZodType<z.infer<typeof requestSchema>>;

export const validateRequest = (schema: RequestSchema): RequestHandler => (req, _res, next) => {
    const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
    });

    if (!result.success) {
        const messages = result.error.issues.map(issue => issue.message).join(', ');
        next(new ValidationError(messages));
        return;
    }

    req.body = result.data.body;
    next();
}