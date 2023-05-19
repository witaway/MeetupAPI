import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { hashPasswordsMiddleware } from './middlewares/hash-passwords.middleware';

@Module({
	imports: [
		PrismaModule.forRoot({
			isGlobal: true,
			prismaServiceOptions: {
				prismaOptions: {
					log: ['query'],
					errorFormat: 'pretty',
				},
				explicitConnect: true,
				middlewares: [hashPasswordsMiddleware],
			},
		}),
	],
})
export class DatabaseModule {}
