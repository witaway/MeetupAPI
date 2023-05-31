import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { logger } from '@common/utils';
import { ConfigType } from '@nestjs/config';

import { ServerConfig } from '@config/server.config';
import { CookiesConfig } from '@config/cookies.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from '@config/swagger.config';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// Validation
	app.useGlobalPipes(new ValidationPipe());

	// Enable shutdown hook
	const prismaService: PrismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	// Load configs
	const serverConfig: ConfigType<typeof ServerConfig> = app.get(
		ServerConfig.KEY,
	);
	const cookiesConfig: ConfigType<typeof CookiesConfig> = app.get(
		CookiesConfig.KEY,
	);
	const swaggerConfig: ConfigType<typeof SwaggerConfig> = app.get(
		SwaggerConfig.KEY,
	);

	const port = serverConfig.port;
	const cookieSecret = cookiesConfig.secret;

	// Security
	app.use(helmet());
	app.enableCors();
	app.use(cookieParser(cookieSecret));

	// Swagger
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('docs', app, document);

	// Run server
	app.setGlobalPrefix('v1');
	app.listen(port).then(() => {
		logger.info(`Server has been started on http://localhost:${port}`);
	});
}

bootstrap().catch((reason) => {
	logger.fatal(reason, 'Unhandled exception due init. Shutting down');
});
