import passport from 'passport';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import ResponseFormat from '@utils/response-format';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate(
		'jwt',
		{
			session: false,
		},
		(err: any, user: any, info: any) => {
			if (err) {
				return res
					.status(401)
					.send(ResponseFormat.error(401, 'Unauthorized', err));
			}
			if (!user) {
				return res
					.status(401)
					.send(ResponseFormat.error(401, 'Unauthorized', {}));
			}
			req.user = user;
			next();
		},
	)(req, res, next);
};

export default authenticate;
