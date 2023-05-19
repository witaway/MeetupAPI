import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from '@common/filters';
import { JwtAuthGuard } from '@common/guards';
import { CoreModule } from '@core/core.module';

@Module({
	imports: [DatabaseModule, CoreModule],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
	controllers: [],
})
export class AppModule {
	public configure(consumer: MiddlewareConsumer) {}
}
