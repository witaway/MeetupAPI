import { Injectable, NotFoundException } from '@nestjs/common';
import { MeetupRepository } from '@core/meetup/repositories';
import { CreateMeetupDto, UpdateMeetupDto } from '@core/meetup/dto/meetup.dto';

@Injectable()
export class MeetupService {
	constructor(private meetupRepository: MeetupRepository) {}

	public async isExists(meetupId: number) {
		const meetup = await this.meetupRepository.readByID(meetupId);
		return !(meetup === null || meetup === undefined);
	}

	public async isOwner(userId: number, meetupId: number) {
		const meetup = await this.meetupRepository.readByID(meetupId);
		if (meetup === null || meetup === undefined) {
			throw new NotFoundException();
		}
		return meetup.owner.id === userId;
	}

	public async create(ownerId: number, meetupDetails: CreateMeetupDto) {
		return this.meetupRepository.create(ownerId, meetupDetails);
	}

	public async getList() {
		return this.meetupRepository.readList();
	}

	public async getByID(id: number) {
		return this.meetupRepository.readByID(id);
	}

	public async updateByID(meetupId: number, meetupDetails: UpdateMeetupDto) {
		return this.meetupRepository.updateByID(meetupId, meetupDetails);
	}

	public async deleteByID(meetupId: number) {
		return this.meetupRepository.deleteByID(meetupId);
	}
}
