import { registerAs } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { env } from '@config/env';

export const SwaggerConfig = registerAs('swagger', () =>
	new DocumentBuilder()
		.setTitle('MeetupAPI')
		.setDescription(
			'The sample Nest.js application that provides users management, authentication and some meetup CRUDs',
		)
		.setVersion('1.0')
		.addCookieAuth(env.COOKIE_NAME_ACCESS_TOKEN)
		.build(),
);
