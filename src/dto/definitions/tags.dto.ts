import { z } from 'zod';

export const tagInfo = z.object({
	name: z.string().min(1).max(255),
});

export type TagInfo = z.infer<typeof tagInfo>;
