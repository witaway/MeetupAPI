import { RequestSchema } from '@customTypes/request-schema';
import { z } from 'zod';

const meetupInfo = z.object({
	theme: z.string().min(5).max(50),
	description: z.string().min(5).max(255),
	place: z.string().min(5).max(255),
	time: z.coerce.date(),
});

export type MeetupInfo = z.infer<typeof meetupInfo>;

export const createMeetupSchema = {
	body: meetupInfo
		.extend({
			tags: z.number().array().max(255).optional().default([]),
		})
		.strict(),
} as const satisfies RequestSchema;

export const updateMeetupSchema = {
	body: meetupInfo.partial().strict(),
	params: z.object({
		meetupId: z.coerce.number(),
	}),
} as const satisfies RequestSchema;

export const readAllMeetupsSchema = {} as const satisfies RequestSchema;

export const readMeetupSchema = {
	params: z.object({
		meetupId: z.coerce.number(),
	}),
} as const satisfies RequestSchema;

export const deleteMeetupSchema = {
	params: z.object({
		meetupId: z.coerce.number(),
	}),
} as const satisfies RequestSchema;
