import { RequestSchema } from '@customTypes/request-schema';
import { z } from 'zod';

export default class MeetupTagsSchemas {
	static readAll = {
		params: z.object({
			meetupId: z.coerce.number(),
		}),
	} as const satisfies RequestSchema;

	static addTagToMeetup = {
		body: z
			.object({
				id: z.number(),
			})
			.strict(),
		params: z.object({
			meetupId: z.coerce.number(),
		}),
	} as const satisfies RequestSchema;

	static removeFromMeetup = {
		params: z.object({
			tagId: z.coerce.number(),
			meetupId: z.coerce.number(),
		}),
	} as const satisfies RequestSchema;
}
