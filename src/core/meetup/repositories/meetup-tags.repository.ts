import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MeetupTagsRepository {
	constructor(private prisma: PrismaService) {}

	public async readTagsListByMeetupId(meetupId: number) {
		return this.prisma.tag.findMany({
			where: {
				meetups: {
					some: {
						id: meetupId,
					},
				},
			},
		});
	}

	public async appendTagByMeetupId(meetupId: number, tagId: number) {
		return this.prisma.tag.update({
			where: {
				id: tagId,
			},
			data: {
				meetups: {
					connect: {
						id: meetupId,
					},
				},
			},
		});
	}

	public async removeTagByMeetupId(meetupId: number, tagId: number) {
		return this.prisma.tag.update({
			where: {
				id: tagId,
			},
			data: {
				meetups: {
					disconnect: {
						id: meetupId,
					},
				},
			},
		});
	}
}
