import * as dotenv from 'dotenv';
dotenv.config();
import env from './config/env';

import express from 'express';
import init from './loaders';

(async () => {
	// Create web server
	const server = express();
	const port = env.HTTP_PORT; //+process.env['PORT']!;

	// Initialize everything else
	await init(server, port);
})();
