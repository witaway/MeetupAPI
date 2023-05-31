import { Injectable, NotFoundException } from '@nestjs/common';
import { MeetupRepository } from '@core/meetup/repositories';
import { CreateMeetupDto, UpdateMeetupDto } from '@core/meetup/dto/meetup.dto';
import {
	MeetupInfo,
	MeetupInfoWithRelated,
	MeetupShortInfoWithRelated,
} from '../types';

@Injectable()
export class MeetupService {
	constructor(private meetupRepository: MeetupRepository) {}

	public async isExists(meetupId: number): Promise<boolean> {
		const meetup = await this.meetupRepository.readByMeetupId(meetupId);
		return !(meetup === null || meetup === undefined);
	}

	public async isOwner(userId: number, meetupId: number): Promise<boolean> {
		const meetup = await this.meetupRepository.readByMeetupId(meetupId);
		if (meetup === null || meetup === undefined) {
			throw new NotFoundException();
		}
		return meetup.owner.id === userId;
	}

	public async create(
		ownerId: number,
		meetupDetails: CreateMeetupDto,
	): Promise<MeetupInfo> {
		return this.meetupRepository.create(ownerId, meetupDetails);
	}

	public async readList(): Promise<MeetupShortInfoWithRelated[]> {
		return this.meetupRepository.readList();
	}

	public async readByMeetupId(
		meetupId: number,
	): Promise<MeetupInfoWithRelated | null> {
		return this.meetupRepository.readByMeetupId(meetupId);
	}

	public async updateByMeetupId(
		meetupId: number,
		meetupDetails: UpdateMeetupDto,
	): Promise<MeetupInfo> {
		return this.meetupRepository.updateByMeetupId(meetupId, meetupDetails);
	}

	public async deleteByMeetupId(meetupId: number): Promise<MeetupInfo> {
		return this.meetupRepository.deleteByMeetupId(meetupId);
	}
}
