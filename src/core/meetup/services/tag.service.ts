import { TagRepository } from '@core/meetup/repositories';
import { Injectable } from '@nestjs/common';
import { CreateTagDto, UpdateTagDto } from '@core/meetup/dto/tag.dto';

@Injectable()
export class TagService {
	constructor(private tagRepository: TagRepository) {}

	public async isExists(tagId: number) {
		const tag = await this.tagRepository.readByID(tagId);
		return !(tag === null || tag === undefined);
	}

	public async create(tagDetails: CreateTagDto) {
		return this.tagRepository.create(tagDetails);
	}

	public async getList() {
		return this.tagRepository.readList();
	}

	public async getByID(id: number) {
		return this.tagRepository.readByID(id);
	}

	public async updateByID(id: number, tagDetails: UpdateTagDto) {
		return this.tagRepository.updateByID(id, tagDetails);
	}

	public async deleteByID(id: number) {
		return this.tagRepository.deleteByID(id);
	}
}
