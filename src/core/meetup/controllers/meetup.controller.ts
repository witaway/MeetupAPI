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
import { User } from '@common/decorators/user.decorator';
import { IUser } from '@common/types/user.types';

@Controller('/meetups')
export class MeetupController {
	constructor(private meetupService: MeetupService) {}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	public async create(
		@User() user: IUser,
		@Body() meetupDetails: CreateMeetupDto,
	) {
		console.dir(meetupDetails, { depth: 10 });
		return await this.meetupService.create(user.id, meetupDetails);
	}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	public async getList() {
		return await this.meetupService.getList();
	}

	@Get('/:meetupId')
	@HttpCode(HttpStatus.OK)
	public async getByID(@Param('meetupId', ParseIntPipe) meetupId: number) {
		if (!(await this.meetupService.isExists(meetupId))) {
			throw new NotFoundException('Meetup not found');
		}
		return await this.meetupService.getByID(meetupId);
	}

	@Patch('/:meetupId')
	@HttpCode(HttpStatus.OK)
	public async updateByID(
		@User() user: IUser,
		@Param('meetupId', ParseIntPipe) meetupId: number,
		@Body() meetupDetails: UpdateMeetupDto,
	) {
		if (!(await this.meetupService.isExists(meetupId))) {
			throw new NotFoundException('Meetup not found');
		}
		if (!(await this.meetupService.isOwner(user.id, meetupId))) {
			throw new ForbiddenException("You haven't rights to edit the meetup");
		}
		return this.meetupService.updateByID(meetupId, meetupDetails);
	}

	@Delete('/:meetupId')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async deleteByID(
		@User() user: IUser,
		@Param('meetupId', ParseIntPipe) meetupId: number,
	) {
		if (!(await this.meetupService.isExists(meetupId))) {
			throw new NotFoundException('Meetup not found');
		}
		if (!(await this.meetupService.isOwner(user.id, meetupId))) {
			throw new ForbiddenException("You haven't rights to edit the meetup");
		}
		return this.meetupService.deleteByID(meetupId);
	}
}
