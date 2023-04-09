import prisma from '@database/index';
import { Meetup } from '@prisma/client';

class MeetupRepository {
	static async create(
		ownerId: number,
		meetupInfo: Omit<Meetup, 'id' | 'ownerId'>,
	) {
		return prisma.meetup.create({
			data: {
				ownerId,
				time: meetupInfo.time,
				theme: meetupInfo.theme,
				place: meetupInfo.place,
				description: meetupInfo.description,
			},
		});
	}

	static async readByID(id: number) {
		return prisma.meetup.findUnique({
			select: {
				id: true,
				time: true,
				theme: true,
				place: true,
				description: true,
				owner: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				tags: {
					select: {
						id: true,
						name: true,
					},
				},
			},
			where: {
				id,
			},
		});
	}

	static async readList() {
		return prisma.meetup.findMany({
			select: {
				id: true,
				theme: true,
				time: true,
				owner: {
					select: {
						id: true,
						name: true,
					},
				},
				tags: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	}

	static async updateByID(
		id: number,
		meetupInfo: Partial<Omit<Meetup, 'id' | 'ownerId'>>,
	) {
		return prisma.meetup.update({
			data: {
				time: meetupInfo.time,
				theme: meetupInfo.theme,
				place: meetupInfo.place,
				description: meetupInfo.description,
			},
			where: { id },
		});
	}

	static async deleteByID(id: number) {
		return prisma.meetup.delete({
			where: { id },
		});
	}

	static async readTags(meetupId: number) {
		return prisma.tag.findMany({
			where: {
				meetups: {
					some: {
						id: meetupId,
					},
				},
			},
		});
	}

	static async addTag(meetupId: number, tagId: number) {
		return prisma.tag.update({
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

	static async removeTag(meetupId: number, tagId: number) {
		return prisma.tag.update({
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

export default MeetupRepository;
