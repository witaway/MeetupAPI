import { TagInfo } from '@core/meetup/types/tag.type';

export interface OwnerShortInfo {
	id: number;
	name: string;
}

export interface MeetupShortInfo {
	id: number;
	theme: string;
	time: Date;
}

export interface MeetupShortInfoWithRelated extends MeetupShortInfo {
	owner: OwnerShortInfo;
	tags: TagInfo[];
}

export interface MeetupInfo {
	id: number;
	time: Date;
	place: string;
	theme: string;
	description: string;
}

export interface MeetupInfoWithRelated extends MeetupInfo {
	owner: OwnerShortInfo;
	tags: TagInfo[];
}
