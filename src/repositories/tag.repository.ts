import prisma from '@database/index';
import { Tag } from '@prisma/client';

class TagRepository {
	static async create(tagInfo: Omit<Tag, 'id'>) {
		return prisma.tag.create({
			data: {
				name: tagInfo.name,
			},
		});
	}

	static async readByID(id: number) {
		return prisma.tag.findUnique({
			select: {
				id: true,
				name: true,
			},
			where: {
				id,
			},
		});
	}

	static async readList() {
		return prisma.tag.findMany({});
	}

	static async updateByID(id: number, tagInfo: Partial<Omit<Tag, 'id'>>) {
		return prisma.tag.update({
			data: {
				name: tagInfo.name,
			},
			where: { id },
		});
	}

	static async deleteByID(id: number) {
		return prisma.tag.delete({
			where: { id },
		});
	}
}

export default TagRepository;
