import * as dotenv from 'dotenv';
dotenv.config();
import env from './config/env';

import express from 'express';
import init from './loaders';
import logger from '@utils/logger';

(async () => {
	// Create web server
	const app = express();
	const port = env.HTTP_PORT;

	// Initialize everything else
	logger.info('Application init is run...');
	init(app, port).catch((error: any) => {
		logger.fatal(error, 'Unhandled exception due init. Shutting down');
	});
})();
