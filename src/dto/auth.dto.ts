import { RequestSchema } from '@customTypes/request-schema';
import { z } from 'zod';

const loginCredentials = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

const registerCredentials = z.object({
	email: z.string().email(),
	name: z.string().min(1),
	password: z.string().min(8),
});

export type LoginCredentials = z.infer<typeof loginCredentials>;
export type RegisterCredentials = z.infer<typeof registerCredentials>;

export const loginSchema = {
	body: loginCredentials.strict(),
} as const satisfies RequestSchema;

export const registerSchema = {
	body: registerCredentials.strict(),
} as const satisfies RequestSchema;

export const logoutSchema = {} as const satisfies RequestSchema;
