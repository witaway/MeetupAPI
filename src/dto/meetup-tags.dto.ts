import { RequestSchema } from '@customTypes/request-schema';
import { z } from 'zod';

export const readAllTagsOfMeetupSchema = {
	params: z.object({
		meetupId: z.coerce.number(),
	}),
} as const satisfies RequestSchema;

export const addTagToMeetupSchema = {
	body: z
		.object({
			id: z.number(),
		})
		.strict(),
	params: z.object({
		meetupId: z.coerce.number(),
	}),
} as const satisfies RequestSchema;

export const removeTagFromMeetupSchema = {
	params: z.object({
		tagId: z.coerce.number(),
		meetupId: z.coerce.number(),
	}),
} as const satisfies RequestSchema;
