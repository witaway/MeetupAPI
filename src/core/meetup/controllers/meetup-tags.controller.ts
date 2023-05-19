import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { MeetupTagsService } from '@core/meetup/services';
import { AddTagToMeetupDto } from '@core/meetup/dto/meetup-tags.dto';

@Controller('/:meetupId/')
export class MeetupTagsController {
	constructor(private meetupTagsService: MeetupTagsService) {}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	public async listTags(@Param('meetupId', ParseIntPipe) meetupId: number) {
		return await this.meetupTagsService.listTags(meetupId);
	}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	public async addTag(
		@Param('meetupId', ParseIntPipe) meetupId: number,
		@Body() body: AddTagToMeetupDto,
	) {
		return await this.meetupTagsService.addTag(meetupId, body.tagId);
	}

	@Post('/:tagId')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async removeTag(
		@Param('meetupId', ParseIntPipe) meetupId: number,
		@Param('tagId', ParseIntPipe) tagId: number,
	) {
		await this.meetupTagsService.removeTag(meetupId, tagId);
		return {};
	}
}
