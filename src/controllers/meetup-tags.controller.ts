import ResponseFormat from '@utils/response-format';
import { Response } from 'express-serve-static-core';
import { TypedRequest } from '@customTypes/express-typed-request';
import {
	addTagToMeetupSchema,
	readAllTagsOfMeetupSchema,
	removeTagFromMeetupSchema,
} from '@dto/meetup-tags.dto';
import MeetupService from '@services/meetup.service';

class TagsController {
	static async readAllTagsOfMeetup(
		req: TypedRequest<typeof readAllTagsOfMeetupSchema>,
		res: Response,
	) {
		const tags = await MeetupService.listTags(req.params.meetupId);
		res
			.status(200)
			.json(
				ResponseFormat.success(200, 'List of tags is got successfully', tags),
			);
	}

	static async addTagToMeetup(
		req: TypedRequest<typeof addTagToMeetupSchema>,
		res: Response,
	) {
		const addedTag = await MeetupService.addTag(
			req.params.meetupId,
			req.body.id,
		);
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Tag added successfully', addedTag));
	}

	static async removeTagFromMeetup(
		req: TypedRequest<typeof removeTagFromMeetupSchema>,
		res: Response,
	) {
		const removedTag = await MeetupService.removeTag(
			req.params.meetupId,
			req.params.tagId,
		);
		res
			.status(200)
			.json(
				ResponseFormat.success(200, 'Tag removed successfully', removedTag),
			);
	}
}

export default TagsController;
