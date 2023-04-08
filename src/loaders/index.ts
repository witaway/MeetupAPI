import initExpressModules from './express-modules-loader';
import setupRoutes from './routes-loader';
import initStartServer from './start-server-loader';
import setupPassportStrategies from './passport-strategies-loader';

import { Express } from 'express';
import * as http from 'http';

const init = async (express: Express, port: number): Promise<void> => {
	setupPassportStrategies();

	initExpressModules(express);

	// Loads all routes
	setupRoutes(express);

	// Get http server instance
	const server = http.createServer(express);

	// Start server
	initStartServer(server, port);
};

export default init;
