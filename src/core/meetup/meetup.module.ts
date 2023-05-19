import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { MeetupController } from '@core/meetup/controllers/meetup.controller';
import { MeetupTagsController } from '@core/meetup/controllers/meetup-tags.controller';
import { TagController } from '@core/meetup/controllers/tag.controller';
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
