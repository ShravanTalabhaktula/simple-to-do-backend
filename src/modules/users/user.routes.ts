import { Router } from 'express';
import { validateRequest } from '../../middleware/validation-request.middleware.js';
import { register } from './user.controller.js';
import { registerUserSchema } from './validation/register-user.schema.js';

const router = Router();

router.post('/register', validateRequest(registerUserSchema), register);

export default router;