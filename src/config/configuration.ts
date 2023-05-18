import nodeConfig from 'config';

const configuration = {
	server: {
		port: nodeConfig.get<number>('server.port'),
	},
	cookie: {
		secret: nodeConfig.get<string>('cookie.secret'),
		records: {
			accessToken: {
				name: nodeConfig.get<string>('cookie.records.accessToken.name'),
				expiration: nodeConfig.get<string>(
					'cookie.records.accessToken.expiration',
				),
			},
			refreshToken: {
				name: nodeConfig.get<string>('cookie.records.refreshToken.name'),
				expiration: nodeConfig.get<string>(
					'cookie.records.refreshToken.expiration',
				),
				expirationSLI: nodeConfig.get<string>(
					'cookie.records.refreshToken.expirationSLI',
				),
			},
		},
	},
	jwt: {
		accessToken: {
			privateKey: nodeConfig.get<string>('jwt.accessToken.privateKey'),
			expiration: nodeConfig.get<string>('jwt.accessToken.expiration'),
		},
		refreshToken: {
			privateKey: nodeConfig.get<string>('jwt.refreshToken.privateKey'),
			expiration: nodeConfig.get<string>('jwt.refreshToken.expiration'),
			expirationSLI: nodeConfig.get<string>('jwt.refreshToken.expirationSLI'),
		},
	},
} as const;

export default configuration;
