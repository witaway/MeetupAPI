import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Patch,
	Post,
} from '@nestjs/common';
import { CreateMeetupDto, UpdateMeetupDto } from '@core/meetup/dto/meetup.dto';
import { MeetupService } from '@core/meetup/services';
import { GetUser } from '@common/decorators/get-user.decorator';
import { User } from '@common/types/user.types';
import { ResponseMessage } from '@common/decorators';
import { IntParam } from '@common/decorators/int-param.decorator';
import {
	MeetupInfo,
	MeetupInfoWithRelated,
	MeetupShortInfoWithRelated,
} from '../types';
import { EmptyResponse, ReadAllResult } from '@common/types';
import { ApiCookieAuth } from '@nestjs/swagger';

@ApiCookieAuth()
@Controller('/meetups')
export class MeetupController {
	constructor(private meetupService: MeetupService) {}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Meetup created successfully')
	public async create(
		@GetUser() user: User,
		@Body() meetupDetails: CreateMeetupDto,
	): Promise<MeetupInfo> {
		const meetup = await this.meetupService.create(user.id, meetupDetails);
		return {
			id: meetup.id,
			time: meetup.time,
			place: meetup.place,
			theme: meetup.theme,
			description: meetup.description,
		};
	}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Meetups got successfully')
	public async readList(): Promise<ReadAllResult<MeetupShortInfoWithRelated>> {
		const meetupsList = await this.meetupService.readList();
		return {
			totalRecordsNumber: meetupsList.length,
			entities: meetupsList,
		};
	}

	@Get('/:meetupId')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Meetup got successfully')
	public async readByMeetupId(
		@IntParam('meetupId') meetupId: number,
	): Promise<MeetupInfoWithRelated> {
		const meetup = await this.meetupService.readByMeetupId(meetupId);
		if (!meetup) {
			throw new NotFoundException('Meetup not found');
		}
		return meetup;
	}

	@Patch('/:meetupId')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Meetup updated successfully')
	public async updateByMeetupId(
		@GetUser() user: User,
		@IntParam('meetupId') meetupId: number,
		@Body() meetupDetails: UpdateMeetupDto,
	): Promise<MeetupInfo> {
		if (!(await this.meetupService.isExists(meetupId))) {
			throw new NotFoundException('Meetup not found');
		}
		if (!(await this.meetupService.isOwner(user.id, meetupId))) {
			throw new ForbiddenException("You haven't rights to edit the meetup");
		}
		return this.meetupService.updateByMeetupId(meetupId, meetupDetails);
	}

	@Delete('/:meetupId')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ResponseMessage('Meetup deleted successfully')
	public async deleteByMeetupId(
		@GetUser() user: User,
		@IntParam('meetupId') meetupId: number,
	): Promise<EmptyResponse> {
		if (!(await this.meetupService.isExists(meetupId))) {
			throw new NotFoundException('Meetup not found');
		}
		if (!(await this.meetupService.isOwner(user.id, meetupId))) {
			throw new ForbiddenException("You haven't rights to edit the meetup");
		}
		await this.meetupService.deleteByMeetupId(meetupId);
		return {};
	}
}
