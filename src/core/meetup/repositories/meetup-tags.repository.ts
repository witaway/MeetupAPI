import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MeetupTagsRepository {
	constructor(private prisma: PrismaService) {}

	public async readTags(meetupId: number) {
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

	public async addTag(meetupId: number, tagId: number) {
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

	public async removeTag(meetupId: number, tagId: number) {
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
