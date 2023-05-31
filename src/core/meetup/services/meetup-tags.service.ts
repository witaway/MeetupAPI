import { ConflictException, Injectable } from '@nestjs/common';
import { MeetupTagsRepository } from '@core/meetup/repositories';
import { TagInfo } from '../types';

@Injectable()
export class MeetupTagsService {
	constructor(private meetupTagsRepository: MeetupTagsRepository) {}

	public async isTagSetByMeetupId(
		meetupId: number,
		tagId: number,
	): Promise<boolean> {
		const tags = await this.readTagsListByMeetupId(meetupId);
		const isTagSet = tags.some((tag) => tag.id === tagId);
		return isTagSet;
	}

	public async readTagsListByMeetupId(meetupId: number): Promise<TagInfo[]> {
		return this.meetupTagsRepository.readTagsListByMeetupId(meetupId);
	}

	public async appendTagByMeetupId(
		meetupId: number,
		tagId: number,
	): Promise<TagInfo> {
		const tags = await this.readTagsListByMeetupId(meetupId);
		const isTagSet = tags.some((tag) => tag.id === tagId);
		if (isTagSet) {
			throw new ConflictException('The tag is already set to the meetup');
		}
		return this.meetupTagsRepository.appendTagByMeetupId(meetupId, tagId);
	}

	public async removeTagByMeetupId(
		meetupId: number,
		tagId: number,
	): Promise<TagInfo> {
		const tags = await this.readTagsListByMeetupId(meetupId);
		const isTagSet = tags.some((tag) => tag.id === tagId);
		if (!isTagSet) {
			throw new ConflictException("The meetup doesn't have such tag");
		}
		return this.meetupTagsRepository.removeTagByMeetupId(meetupId, tagId);
	}
}
