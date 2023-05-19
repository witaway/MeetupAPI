import { ConflictException, Injectable } from '@nestjs/common';
import { MeetupTagsRepository } from '@core/meetup/repositories';

@Injectable()
export class MeetupTagsService {
	constructor(private meetupTagsRepository: MeetupTagsRepository) {}

	public async listTags(meetupId: number) {
		return this.meetupTagsRepository.readTags(meetupId);
	}

	public async addTag(meetupId: number, tagId: number) {
		const tags = await this.listTags(meetupId);
		const isTagSet = tags.some((tag) => tag.id === tagId);
		if (isTagSet) {
			throw new ConflictException('The tag is already set to the meetup');
		}
		return this.meetupTagsRepository.addTag(meetupId, tagId);
	}

	public async removeTag(meetupId: number, tagId: number) {
		const tags = await this.listTags(meetupId);
		const isTagSet = tags.some((tag) => tag.id === tagId);
		if (!isTagSet) {
			throw new ConflictException("The meetup doesn't have such tag");
		}
		return this.meetupTagsRepository.removeTag(meetupId, tagId);
	}
}
