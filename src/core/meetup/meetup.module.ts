import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import {
	MeetupService,
	MeetupTagsService,
	TagService,
} from '@core/meetup/services';
import {
	MeetupRepository,
	MeetupTagsRepository,
	TagRepository,
} from '@core/meetup/repositories';
import {
	MeetupController,
	MeetupTagsController,
	TagController,
} from '@core/meetup/controllers';

@Module({
	imports: [PrismaModule],
	controllers: [MeetupController, MeetupTagsController, TagController],
	providers: [
		MeetupService,
		TagService,
		MeetupTagsService,
		MeetupRepository,
		TagRepository,
		MeetupTagsRepository,
	],
	exports: [MeetupService, TagService, MeetupTagsService],
})
export class MeetupModule {}
