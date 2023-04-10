import { Router } from 'express';
import validate from '@middlewares/validate.middleware';
import AuthController from '../controllers/auth.controller';
import AuthSchemas from '@dto/schemas/auth.dto';

const authRouter = Router();

authRouter.post(
	'/register',
	validate(AuthSchemas.register),
	AuthController.register,
);
authRouter.post('/login', validate(AuthSchemas.login), AuthController.login);
authRouter.post('/logout', validate(AuthSchemas.logout), AuthController.logout);

export default authRouter;
