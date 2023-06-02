import { Meetup } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import {
	selectMeetupInfo,
	MeetupInfo,
	selectMeetupInfoWithRelated,
	MeetupInfoWithRelated,
	selectMeetupShortInfoWithRelated,
	MeetupShortInfoWithRelated,
} from '../types';

@Injectable()
export class MeetupRepository {
	constructor(private prisma: PrismaService) {}

	public async create(
		ownerId: number,
		meetupDetails: Omit<Meetup, 'id' | 'ownerId'>,
	): Promise<MeetupInfo> {
		return this.prisma.meetup.create({
			...selectMeetupInfo,
			data: {
				ownerId,
				time: meetupDetails.time,
				theme: meetupDetails.theme,
				place: meetupDetails.place,
				description: meetupDetails.description,
			},
		});
	}

	public async readByMeetupId(
		meetupId: number,
	): Promise<MeetupInfoWithRelated | null> {
		return this.prisma.meetup.findUnique({
			...selectMeetupInfoWithRelated,
			where: {
				id: meetupId,
			},
		});
	}

	public async readList(): Promise<MeetupShortInfoWithRelated[]> {
		return this.prisma.meetup.findMany({
			...selectMeetupShortInfoWithRelated,
		});
	}

	public async updateByMeetupId(
		meetupId: number,
		meetupDetails: Partial<Omit<Meetup, 'id' | 'ownerId'>>,
	): Promise<MeetupInfo> {
		return this.prisma.meetup.update({
			...selectMeetupInfo,
			data: {
				time: meetupDetails.time,
				theme: meetupDetails.theme,
				place: meetupDetails.place,
				description: meetupDetails.description,
			},
			where: { id: meetupId },
		});
	}

	public async deleteByMeetupId(meetupId: number): Promise<MeetupInfo> {
		return this.prisma.meetup.delete({
			...selectMeetupInfo,
			where: { id: meetupId },
		});
	}
}
