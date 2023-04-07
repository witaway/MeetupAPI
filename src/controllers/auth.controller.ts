import UserService from '@services/user.service';
import AuthService from '@services/auth.service';
import ResponseFormat from '@utils/response-format';

import { Request, Response } from 'express-serve-static-core';

class AuthController {
	static async register(req: Request, res: Response) {
		const userObject = await UserService.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Registered successfully', userObject));
	}

	static async login(req: Request, res: Response) {
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

	static async logout(req: Request, res: Response) {
		// req.logout();
		res.clearCookie('jwt');
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Logged out successfully', {}));
	}
}

module.exports = AuthController;
