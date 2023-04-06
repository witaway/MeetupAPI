import { cleanEnv, port, str, host } from 'envalid';
import * as process from 'process';

const env = cleanEnv(process.env, {
	// Port of application running
	HTTP_PORT: port(),

	// Private key for JWT signing
	JWT_PRIVATE_KEY: str(),

	// Secret for cookies
	COOKIE_SECRET: str(),

	// Auth data for database
	DATABASE_URL: host(),
});

export default env;
