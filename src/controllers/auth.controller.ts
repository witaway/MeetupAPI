import UserService from '@services/user.service';
import AuthService from '@services/auth.service';
import ResponseFormat from '@utils/response-format';
import { NextFunction, Response } from 'express-serve-static-core';
import { TypedRequest } from '@customTypes/express-typed-request';
import AuthSchemas from '@dto/schemas/auth.dto';

class AuthController {
	static async register(
		req: TypedRequest<typeof AuthSchemas.register>,
		res: Response,
	) {
		const userObject = await UserService.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Registered successfully', userObject));
	}

	static async login(
		req: TypedRequest<typeof AuthSchemas.login>,
		res: Response,
	) {
		const token = await AuthService.loginWithEmailAndPassword(
			req.body.email,
			req.body.password,
		);

		const sec = 1000;
		const min = 60 * sec;
		const hour = 60 * min;

		res.cookie('jwt', token, {
			maxAge: 2 * hour,
		});

		res
			.status(200)
			.json(ResponseFormat.success(200, 'Logged in successfully', { token }));
	}

	static async logout(
		req: TypedRequest<typeof AuthSchemas.logout>,
		res: Response,
		next: NextFunction,
	) {
		req.logout((err) => {
			return next(err);
		});
		res.clearCookie('jwt');
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Logged out successfully', {}));
	}
}

export default AuthController;
