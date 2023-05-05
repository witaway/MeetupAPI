import UserService from '@services/user.service';
import AuthService from '@services/auth.service';
import ResponseFormat from '@utils/response-format';
import { NextFunction, Response } from 'express-serve-static-core';
import { TypedRequest } from '@customTypes/express-typed-request';
import AuthSchemas from '@dto/schemas/auth.dto';
import config from '@utils/config';
import { addTimeToDate } from '@utils/helpers';

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

		const cookieName = config.cookie.records.accessToken.name;
		const cookieExpirationTime = config.cookie.records.accessToken.expiration;

		res.cookie(cookieName, token, {
			expires: addTimeToDate(new Date(), cookieExpirationTime),
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

		const cookieName = config.cookie.records.accessToken.name;

		res.clearCookie(cookieName);
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Logged out successfully', {}));
	}
}

export default AuthController;
