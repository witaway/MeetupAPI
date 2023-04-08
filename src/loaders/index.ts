import setupExpress from './setup-express';
import setupRoutes from './setup-routes';
import setupServer from './setup-server';
import setupPassportStrategies from './setup-passport';

import { Express } from 'express';
import * as http from 'http';

const init = async (express: Express, port: number): Promise<void> => {
	setupPassportStrategies();
	setupExpress(express);
	setupRoutes(express);
	const server = http.createServer(express);
	setupServer(server, port);
};

export default init;
