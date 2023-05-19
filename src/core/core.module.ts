import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MeetupModule } from '@core/meetup/meetup.module';

@Module({
	imports: [AuthModule, MeetupModule],
})
export class CoreModule {}
