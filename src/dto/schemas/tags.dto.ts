import { RequestSchema } from '@customTypes/request-schema';
import { z } from 'zod';
import { tagInfo } from '@dto/definitions/tags.dto';

export default class TagSchemas {
	static create = {
		body: tagInfo.strict(),
	} as const satisfies RequestSchema;

	static update = {
		body: tagInfo.partial().strict(),
		params: z.object({
			tagId: z.coerce.number(),
		}),
	} as const satisfies RequestSchema;

	static readAll = {} as const satisfies RequestSchema;

	static read = {
		params: z.object({
			tagId: z.coerce.number(),
		}),
	} as const satisfies RequestSchema;

	static delete = {
		params: z.object({
			tagId: z.coerce.number(),
		}),
	} as const satisfies RequestSchema;
}
