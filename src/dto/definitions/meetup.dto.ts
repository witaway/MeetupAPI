import { z } from 'zod';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const meetupInfo = z.object({
	theme: z.string().min(5).max(50),
	description: z.string().min(5).max(255),
	place: z.string().min(5).max(255),
	time: z.coerce.date(),
});

export type MeetupInfo = z.infer<typeof meetupInfo>;

export function register(registry: OpenAPIRegistry) {
	registry.register('MeetupData', meetupInfo);
}
