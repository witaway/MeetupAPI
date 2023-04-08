import { Router } from 'express';
import validate from '@middlewares/validate.middleware';
import { loginSchema, logoutSchema, registerSchema } from '@dto/auth.dto';
import AuthController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), AuthController.register);
authRouter.get('/login', validate(loginSchema), AuthController.login);
authRouter.get('/logout', validate(logoutSchema), AuthController.logout);

export default authRouter;
