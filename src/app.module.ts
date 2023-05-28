import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from '@common/filters';
import { JwtAuthGuard } from '@common/guards';
import { CoreModule } from '@core/core.module';
import { ResponseFormatInterceptor } from '@common/interceptors/response-format.interceptor';
import { ConfigModule } from '@config/config.module';

@Module({
	imports: [ConfigModule, DatabaseModule, CoreModule],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseFormatInterceptor,
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
