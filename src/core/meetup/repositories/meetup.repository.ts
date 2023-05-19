import { Meetup } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MeetupRepository {
	constructor(private prisma: PrismaService) {}

	public async create(
		ownerId: number,
		meetupDetails: Omit<Meetup, 'id' | 'ownerId'>,
	) {
		return this.prisma.meetup.create({
			data: {
				ownerId,
				time: meetupDetails.time,
				theme: meetupDetails.theme,
				place: meetupDetails.place,
				description: meetupDetails.description,
			},
		});
	}

	public async readByID(id: number) {
		return this.prisma.meetup.findUnique({
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

	public async readList() {
		return this.prisma.meetup.findMany({
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

	public async updateByID(
		id: number,
		meetupDetails: Partial<Omit<Meetup, 'id' | 'ownerId'>>,
	) {
		return this.prisma.meetup.update({
			data: {
				time: meetupDetails.time,
				theme: meetupDetails.theme,
				place: meetupDetails.place,
				description: meetupDetails.description,
			},
			where: { id },
		});
	}

	public async deleteByID(id: number) {
		return this.prisma.meetup.delete({
			where: { id },
		});
	}
}
