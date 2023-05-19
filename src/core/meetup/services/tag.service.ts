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

	public async readList() {
		return this.tagRepository.readList();
	}

	public async readByMeetupId(meetupId: number) {
		return this.tagRepository.readByID(meetupId);
	}

	public async updateByMeetupId(meetupId: number, tagDetails: UpdateTagDto) {
		return this.tagRepository.updateByID(meetupId, tagDetails);
	}

	public async deleteByMeetupId(meetupId: number) {
		return this.tagRepository.deleteByID(meetupId);
	}
}
