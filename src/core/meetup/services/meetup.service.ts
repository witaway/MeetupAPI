import { Injectable, NotFoundException } from '@nestjs/common';
import { MeetupRepository } from '@core/meetup/repositories';
import { CreateMeetupDto, UpdateMeetupDto } from '@core/meetup/dto/meetup.dto';

@Injectable()
export class MeetupService {
	constructor(private meetupRepository: MeetupRepository) {}

	public async isExists(meetupId: number) {
		const meetup = await this.meetupRepository.readByMeetupId(meetupId);
		return !(meetup === null || meetup === undefined);
	}

	public async isOwner(userId: number, meetupId: number) {
		const meetup = await this.meetupRepository.readByMeetupId(meetupId);
		if (meetup === null || meetup === undefined) {
			throw new NotFoundException();
		}
		return meetup.owner.id === userId;
	}

	public async create(ownerId: number, meetupDetails: CreateMeetupDto) {
		return this.meetupRepository.create(ownerId, meetupDetails);
	}

	public async readList() {
		return this.meetupRepository.readList();
	}

	public async readByMeetupId(meetupId: number) {
		return this.meetupRepository.readByMeetupId(meetupId);
	}

	public async updateByMeetupId(
		meetupId: number,
		meetupDetails: UpdateMeetupDto,
	) {
		return this.meetupRepository.updateByMeetupId(meetupId, meetupDetails);
	}

	public async deleteByMeetupId(meetupId: number) {
		return this.meetupRepository.deleteByMeetupId(meetupId);
	}
}
