import { Tag } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { selectTagInfo, TagInfo } from '../types';

@Injectable()
export class TagRepository {
	constructor(private prisma: PrismaService) {}

	public async create(tagDetails: Omit<Tag, 'id'>): Promise<TagInfo> {
		return this.prisma.tag.create({
			...selectTagInfo,
			data: {
				name: tagDetails.name,
			},
		});
	}

	public async readByID(id: number): Promise<TagInfo | null> {
		return this.prisma.tag.findUnique({
			...selectTagInfo,
			where: {
				id,
			},
		});
	}

	public async readList(): Promise<TagInfo[]> {
		return this.prisma.tag.findMany({
			...selectTagInfo,
		});
	}

	public async updateByID(
		id: number,
		tagDetails: Partial<Omit<Tag, 'id'>>,
	): Promise<TagInfo> {
		return this.prisma.tag.update({
			...selectTagInfo,
			data: {
				name: tagDetails.name,
			},
			where: { id },
		});
	}

	public async deleteByID(id: number): Promise<TagInfo> {
		return this.prisma.tag.delete({
			...selectTagInfo,
			where: { id },
		});
	}
}
