import type { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        status: 'Not Found',
        message: `The requested resource '${req.method} ${req.originalUrl}' was not found on this server.`,
        timestamp: new Date().toISOString(),
    });
};