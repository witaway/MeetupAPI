import { z } from 'zod';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const tagInfo = z.object({
	name: z.string().min(1).max(255),
});

export type TagInfo = z.infer<typeof tagInfo>;

export function register(registry: OpenAPIRegistry) {
	registry.register('TagData', tagInfo);
}
