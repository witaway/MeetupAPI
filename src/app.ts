import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import init from './loaders';
import logger from '@utils/logger';
import config from '@utils/config';

(async () => {
	// Create web server
	const app = express();
	const port = config.server.port;

	// Initialize everything else
	logger.info('Application init is run...');
	init(app, port).catch((error: any) => {
		logger.fatal(error, 'Unhandled exception due init. Shutting down');
	});
})();
