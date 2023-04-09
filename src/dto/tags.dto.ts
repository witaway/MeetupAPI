import { RequestSchema } from '@customTypes/request-schema';
import { z } from 'zod';

const tagInfo = z.object({
	name: z.string().min(1).max(255),
});

export type TagInfo = z.infer<typeof tagInfo>;

export const createTagSchema = {
	body: tagInfo.strict(),
} as const satisfies RequestSchema;

export const updateTagSchema = {
	body: tagInfo.partial().strict(),
	params: z.object({
		tagId: z.coerce.number(),
	}),
} as const satisfies RequestSchema;

export const readAllTagsSchema = {} as const satisfies RequestSchema;

export const readTagSchema = {
	params: z.object({
		tagId: z.coerce.number(),
	}),
} as const satisfies RequestSchema;

export const deleteTagSchema = {
	params: z.object({
		tagId: z.coerce.number(),
	}),
} as const satisfies RequestSchema;
