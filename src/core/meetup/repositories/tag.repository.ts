import { Tag } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TagRepository {
	constructor(private prisma: PrismaService) {}

	public async create(tagDetails: Omit<Tag, 'id'>) {
		return this.prisma.tag.create({
			data: {
				name: tagDetails.name,
			},
		});
	}

	public async readByID(id: number) {
		return this.prisma.tag.findUnique({
			select: {
				id: true,
				name: true,
			},
			where: {
				id,
			},
		});
	}

	public async readList() {
		return this.prisma.tag.findMany({});
	}

	public async updateByID(id: number, tagDetails: Partial<Omit<Tag, 'id'>>) {
		return this.prisma.tag.update({
			data: {
				name: tagDetails.name,
			},
			where: { id },
		});
	}

	public async deleteByID(id: number) {
		return this.prisma.tag.delete({
			where: { id },
		});
	}
}
