import {
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { MeetupTagsService } from '@core/meetup/services';
import { AddTagToMeetupDto } from '@core/meetup/dto/meetup-tags.dto';
import { ResponseMessage } from '@common/decorators';
import { IntParam } from '@common/decorators/int-param.decorator';
import { TagInfo } from '../types';
import { EmptyResponse } from '@common/types';

@Controller('/meetups/:meetupId/tags')
export class MeetupTagsController {
	constructor(private meetupTagsService: MeetupTagsService) {}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Tags of requested meetup got successfully')
	public async readTagsListByMeetupId(
		@IntParam('meetupId') meetupId: number,
	): Promise<TagInfo[]> {
		return await this.meetupTagsService.readTagsListByMeetupId(meetupId);
	}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Tag assigned to requested meetup successfully')
	public async appendTagByMeetupId(
		@IntParam('meetupId') meetupId: number,
		@Body() body: AddTagToMeetupDto,
	): Promise<TagInfo> {
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
		@IntParam('meetupId') meetupId: number,
		@IntParam('tagId') tagId: number,
	): Promise<EmptyResponse> {
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
