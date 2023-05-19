import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MeetupModule } from '@core/meetup/meetup.module';
import { UserModule } from '@core/user/user.module';

@Module({
	imports: [AuthModule, UserModule, MeetupModule],
})
export class CoreModule {}
