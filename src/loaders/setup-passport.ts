import { Strategy as JwtStrategy } from 'passport-jwt';
import { Request } from 'express-serve-static-core';
import prisma from '@database/index';
import passport from 'passport';
import config from '@utils/config';

const setupPassportStrategies = () => {
	const extractJwtFromCookiesField = (field: string) => {
		return (req: Request) => {
			let token = null;
			if (req && req.cookies && req.cookies[field]) {
				token = req.cookies[field];
			}
			return token;
		};
	};

	const options = {
		jwtFromRequest: extractJwtFromCookiesField(
			config.cookie.records.accessToken.name,
		),
		secretOrKey: config.cookie.secret,
	};

	passport.use(
		new JwtStrategy(options, async (payload, done) => {
			try {
				const user = await prisma.user.findUnique({
					select: {
						id: true,
						email: true,
						name: true,
						password: true,
						roles: true,
					},
					where: {
						id: payload.id,
					},
				});
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
					// or you could create a new account
				}
			} catch (err) {
				done(err, false);
			}
		}),
	);

	passport.serializeUser(function (user: any, done: any) {
		done(null, user.id);
	});

	passport.deserializeUser(function (user: any, done: any) {
		prisma.user
			.findUnique({
				select: {
					id: true,
				},
				where: {
					id: user.id,
				},
			})
			.then((user) => {
				done(null, user?.id);
			});
	});
};

export default setupPassportStrategies;
