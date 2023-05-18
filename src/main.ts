import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import configuration from '@config/configuration';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaService } from 'nestjs-prisma';
import logger from './common/utils/logger';

const port = configuration.server.port ?? 3000;

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// Validation
	app.useGlobalPipes(new ValidationPipe());

	// Enable shutdown hook
	const prismaService: PrismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	// Security
	app.use(helmet());
	app.enableCors();
	app.use(cookieParser(configuration.cookie.secret));

	app.setGlobalPrefix('v1');

	await app.listen(port);
}

bootstrap()
	.then(() => {
		logger.info(`SERVER STARTED on http://localhost:${port}`);
	})
	.catch((reason) => {
		logger.fatal(reason, 'Unhandled exception due init. Shutting down');
	});
