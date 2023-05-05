import { cleanEnv, url } from 'envalid';
import * as process from 'process';

const env = cleanEnv(process.env, {
	// Auth data for database
	DATABASE_URL: url(),
});

export default env;
