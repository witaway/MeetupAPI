import { registerAs } from '@nestjs/config';
import { env } from '@config/env';

export const CookiesConfig = registerAs('cookies', () => ({
	secret: env.COOKIE_SECRET,
	records: {
		accessToken: {
			name: env.COOKIE_NAME_ACCESS_TOKEN,
			expiration: env.COOKIE_EXPIRATION_ACCESS_TOKEN,
		},
		refreshToken: {
			name: env.COOKIE_NAME_REFRESH_TOKEN,
			expiration: env.COOKIE_EXPIRATION_REFRESH_TOKEN,
			expirationSLI: env.COOKIE_EXPIRATION_SLI_REFRESH_TOKEN,
		},
	},
}));
