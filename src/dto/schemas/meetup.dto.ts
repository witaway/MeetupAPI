import { RequestSchema } from '@customTypes/request-schema';
import { z } from 'zod';
import { meetupInfo } from '@dto/definitions/meetup.dto';

export default class MeetupSchemas {
	static create = {
		body: meetupInfo
			.extend({
				tags: z.number().array().max(255).optional().default([]),
			})
			.strict(),
	} as const satisfies RequestSchema;

	static update = {
		body: meetupInfo.partial().strict(),
		params: z.object({
			meetupId: z.coerce.number(),
		}),
	} as const satisfies RequestSchema;

	static readAll = {} as const satisfies RequestSchema;

	static read = {
		params: z.object({
			meetupId: z.coerce.number(),
		}),
	} as const satisfies RequestSchema;

	static delete = {
		params: z.object({
			meetupId: z.coerce.number(),
		}),
	} as const satisfies RequestSchema;
}
