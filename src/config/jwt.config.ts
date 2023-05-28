import { registerAs } from '@nestjs/config';
import { env } from '@config/env';

export const JwtConfig = registerAs('jwt', () => ({
	accessToken: {
		privateKey: env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
		expiration: env.JWT_ACCESS_TOKEN_EXPIRATION,
	},
	refreshToken: {
		privateKey: env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
		expiration: env.JWT_REFRESH_TOKEN_EXPIRATION,
		expirationSLI: env.JWT_REFRESH_TOKEN_EXPIRATION_SLI,
	},
}));
