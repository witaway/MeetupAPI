import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

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
			},
		}),
	],
})
export class DatabaseModule {}
