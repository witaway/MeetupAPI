import { z } from 'zod';

export const loginCredentials = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export const registerCredentials = z.object({
	email: z.string().email(),
	name: z.string().min(1),
	password: z.string().min(8),
});

export type LoginCredentials = z.infer<typeof loginCredentials>;
export type RegisterCredentials = z.infer<typeof registerCredentials>;
