import dotenv from 'dotenv';

dotenv.config();

export default {
	server: {
		port: 80,
	},
	cookie: {
		secret: 'cookie-secret',
		records: {
			accessToken: {
				name: 'jwt-access',
				expiration: '4h',
			},
			refreshToken: {
				name: 'jwt-refresh',
				expiration: '24h',
			},
		},
	},
	jwt: {
		accessToken: {
			privateKey: 'jwt-access-secret-key',
			expiration: '4h',
		},
		refreshToken: {
			privateKey: 'jwt-refresh-secret-key',
			expiration: '24h',
		},
	},
};
