import * as http from 'http';
import logger from '@utils/logger';

const setupServer = (server: http.Server, port: number) => {
	server.listen(port);

	// Handling server run error
	server.on('error', (error: Error) => {
		logger.fatal(error, 'Unable to start HTTP server');
	});

	// Handling another critical error events
	process.on('unhandledRejection', (error: Error) => {
		logger.fatal(error, 'UNHANDLED REJECTION! Shutting down');
		server.close(() => {
			process.exit(1);
		});
	});

	process.on('SIGTERM', () => {
		logger.info('SIGTERM RECEIVED. Shutting down gracefully');
		server.close(() => {
			logger.info('Process terminated');
		});
	});
};

export default setupServer;
