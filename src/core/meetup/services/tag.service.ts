import { TagRepository } from '@core/meetup/repositories';
import { Injectable } from '@nestjs/common';
import { CreateTagDto, UpdateTagDto } from '@core/meetup/dto/tag.dto';
import { TagInfo } from '../types';

@Injectable()
export class TagService {
	constructor(private tagRepository: TagRepository) {}

	public async isExists(tagId: number): Promise<boolean> {
		const tag = await this.tagRepository.readByID(tagId);
		return !(tag === null || tag === undefined);
	}

	public async create(tagDetails: CreateTagDto): Promise<TagInfo> {
		return this.tagRepository.create(tagDetails);
	}

	public async readList(): Promise<TagInfo[]> {
		return this.tagRepository.readList();
	}

	public async readByMeetupId(meetupId: number): Promise<TagInfo | null> {
		return this.tagRepository.readByID(meetupId);
	}

	public async updateByMeetupId(
		meetupId: number,
		tagDetails: UpdateTagDto,
	): Promise<TagInfo> {
		return this.tagRepository.updateByID(meetupId, tagDetails);
	}

	public async deleteByMeetupId(meetupId: number): Promise<TagInfo> {
		return this.tagRepository.deleteByID(meetupId);
	}
}
