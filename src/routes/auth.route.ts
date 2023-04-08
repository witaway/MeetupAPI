import { Router } from 'express';
import validate from '@middlewares/validate.middleware';
import { loginSchema, logoutSchema, registerSchema } from '@dto/auth.dto';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.get('/login', validate(loginSchema), AuthController.login);
router.get('/logout', validate(logoutSchema), AuthController.logout);

export default router;
