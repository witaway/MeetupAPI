import { Express } from 'express';
import * as express from 'express';
import path from 'path';
import router from '../routes';

const setupRoutes = (server: Express) => {
	// Mount directory with static data
	const staticFolder = path.join(__dirname, '..', '/static');
	server.use('/static', express.static(staticFolder));

	// Mount API router
	server.use('/api/v1', router);
};

export default setupRoutes;
