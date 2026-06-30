import type { RequestHandler } from 'express';
import { registerUser } from './user.service.js';

export const register: RequestHandler = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({
            status: 'SUCCESS',
            data: user
        });
    } catch (error) {
        next(error);
    }
};