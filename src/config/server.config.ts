import { registerAs } from '@nestjs/config';
import { env } from '@config/env';

export const ServerConfig = registerAs('server', () => ({
	port: env.SERVER_PORT,
}));
