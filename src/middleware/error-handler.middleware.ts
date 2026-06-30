import type { ErrorRequestHandler } from 'express';
import { AppError } from '../shared/errors/index.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            timestamp: new Date().toISOString(),
        });
        return;
    }
    console.error(err);
    res.status(500).json({
        status: 'ERROR',
        message: 'Internal Server Error',
        timestamp: new Date().toISOString(),
    });
};