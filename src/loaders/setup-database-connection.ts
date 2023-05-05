import logger from '@utils/logger';
import process from 'process';
import prisma from '@database/index';

const setupDatabaseConnection = () => {
	prisma.$connect().catch((error) => {
		logger.fatal(error, 'Failure during connection to database');
		process.exit(1);
	});
};

export default setupDatabaseConnection;
