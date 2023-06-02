import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { selectTagInfo, TagInfo } from '../types';

@Injectable()
export class MeetupTagsRepository {
	constructor(private prisma: PrismaService) {}

	public async readTagsListByMeetupId(meetupId: number): Promise<TagInfo[]> {
		return this.prisma.tag.findMany({
			...selectTagInfo,
			where: {
				meetups: {
					some: {
						id: meetupId,
					},
				},
			},
		});
	}

	public async appendTagByMeetupId(
		meetupId: number,
		tagId: number,
	): Promise<TagInfo> {
		return this.prisma.tag.update({
			...selectTagInfo,
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

	public async removeTagByMeetupId(
		meetupId: number,
		tagId: number,
	): Promise<TagInfo> {
		return this.prisma.tag.update({
			...selectTagInfo,
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
