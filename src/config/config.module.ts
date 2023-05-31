import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ServerConfig } from '@config/server.config';
import { JwtConfig } from '@config/jwt.config';
import { CookiesConfig } from '@config/cookies.config';
import { SwaggerConfig } from '@config/swagger.config';

@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env'],
			expandVariables: true,
			load: [ServerConfig, JwtConfig, CookiesConfig, SwaggerConfig],
		}),
	],
})
export class ConfigModule implements OnModuleInit {
	public onModuleInit(): any {
		this;
	}
}
