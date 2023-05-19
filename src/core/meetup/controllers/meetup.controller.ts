import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { CreateMeetupDto, UpdateMeetupDto } from '@core/meetup/dto/meetup.dto';
import { MeetupService } from '@core/meetup/services';
import { GetUser } from '@common/decorators/get-user.decorator';
import { User } from '@common/types/user.types';

@Controller('/meetups')
export class MeetupController {
	constructor(private meetupService: MeetupService) {}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	public async create(
		@GetUser() user: User,
		@Body() meetupDetails: CreateMeetupDto,
	) {
		console.dir(meetupDetails, { depth: 10 });
		return await this.meetupService.create(user.id, meetupDetails);
	}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	public async readList() {
		return await this.meetupService.readList();
	}

	@Get('/:meetupId')
	@HttpCode(HttpStatus.OK)
	public async readByMeetupId(
		@Param('meetupId', ParseIntPipe) meetupId: number,
	) {
		if (!(await this.meetupService.isExists(meetupId))) {
			throw new NotFoundException('Meetup not found');
		}
		return await this.meetupService.readByMeetupId(meetupId);
	}

	@Patch('/:meetupId')
	@HttpCode(HttpStatus.OK)
	public async updateByMeetupId(
		@GetUser() user: User,
		@Param('meetupId', ParseIntPipe) meetupId: number,
		@Body() meetupDetails: UpdateMeetupDto,
	) {
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
	public async deleteByMeetupId(
		@GetUser() user: User,
		@Param('meetupId', ParseIntPipe) meetupId: number,
	) {
		if (!(await this.meetupService.isExists(meetupId))) {
			throw new NotFoundException('Meetup not found');
		}
		if (!(await this.meetupService.isOwner(user.id, meetupId))) {
			throw new ForbiddenException("You haven't rights to edit the meetup");
		}
		return this.meetupService.deleteByMeetupId(meetupId);
	}
}
