import { cleanEnv, makeValidator, port, str, url } from 'envalid';
import * as process from 'process';

const duration = makeValidator((value) => {
	if (/^(\d+)(ms|s|m|h|d|w|M|y)$/.test(value)) {
		return value;
	} else {
		throw new Error('Expected duration string');
	}
});

export const env = cleanEnv(process.env, {
	SERVER_PORT: port({
		default: 80,
	}),

	DATABASE_URL: url(),

	COOKIE_SECRET: str(),

	COOKIE_NAME_ACCESS_TOKEN: str(),
	COOKIE_EXPIRATION_ACCESS_TOKEN: duration(),

	COOKIE_NAME_REFRESH_TOKEN: str(),
	COOKIE_EXPIRATION_REFRESH_TOKEN: duration(),
	COOKIE_EXPIRATION_SLI_REFRESH_TOKEN: duration(),

	JWT_ACCESS_TOKEN_PRIVATE_KEY: str(),
	JWT_ACCESS_TOKEN_EXPIRATION: duration(),

	JWT_REFRESH_TOKEN_PRIVATE_KEY: str(),
	JWT_REFRESH_TOKEN_EXPIRATION: duration(),
	JWT_REFRESH_TOKEN_EXPIRATION_SLI: duration(),
});
