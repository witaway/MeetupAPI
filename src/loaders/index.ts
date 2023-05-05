import setupExpress from './setup-express';
import setupRoutes from './setup-routes';
import setupServer from './setup-server';
import setupPassportStrategies from './setup-passport';

import { Express } from 'express';
import * as http from 'http';
import logger from '@utils/logger';
import setupDatabaseConnection from './setup-database-connection';

const init = async (app: Express, port: number): Promise<http.Server> => {
	setupPassportStrategies();
	logger.info('Passport strategies set up - ok');

	setupExpress(app);
	logger.info('Server modules set up - ok');

	setupRoutes(app);
	logger.info('Application routing set up - ok');

	setupDatabaseConnection();
	logger.info('Connection to database - ok');

	const server = http.createServer(app);
	setupServer(server, port);
	logger.info(`SERVER STARTED on http://localhost:${port}`);

	return server;
};

export default init;
