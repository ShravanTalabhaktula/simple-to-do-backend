import type { Request, Response } from 'express';

export const healthCheck = (_req: Request, res: Response): void => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
    });
};