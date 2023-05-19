import {
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { MeetupTagsService } from '@core/meetup/services';
import { AddTagToMeetupDto } from '@core/meetup/dto/meetup-tags.dto';
import { ResponseMessage } from '@common/decorators';

@Controller('/meetups/:meetupId/tags')
export class MeetupTagsController {
	constructor(private meetupTagsService: MeetupTagsService) {}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Tags of requested meetup got successfully')
	public async readTagsListByMeetupId(
		@Param('meetupId', ParseIntPipe) meetupId: number,
	) {
		return await this.meetupTagsService.readTagsListByMeetupId(meetupId);
	}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Tag assigned to requested meetup successfully')
	public async appendTagByMeetupId(
		@Param('meetupId', ParseIntPipe) meetupId: number,
		@Body() body: AddTagToMeetupDto,
	) {
		const isTagAlreadySet = await this.meetupTagsService.isTagSetByMeetupId(
			meetupId,
			body.tagId,
		);
		if (isTagAlreadySet) {
			throw new ConflictException('The tag is already set to the meetup');
		}
		return await this.meetupTagsService.appendTagByMeetupId(
			meetupId,
			body.tagId,
		);
	}

	@Delete('/:tagId')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ResponseMessage('Tag unassigned from requested meetup successfully')
	public async removeTagByMeetupId(
		@Param('meetupId', ParseIntPipe) meetupId: number,
		@Param('tagId', ParseIntPipe) tagId: number,
	) {
		const isTagAlreadySet = await this.meetupTagsService.isTagSetByMeetupId(
			meetupId,
			tagId,
		);
		if (!isTagAlreadySet) {
			throw new ConflictException("The meetup doesn't have such tag");
		}
		await this.meetupTagsService.removeTagByMeetupId(meetupId, tagId);
		return {};
	}
}
