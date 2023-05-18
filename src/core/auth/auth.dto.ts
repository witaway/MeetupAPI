import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

export class SignUpDto extends createZodDto(
	z
		.object({
			email: z.string().nonempty().email(),
			name: z.string().min(1),
			password: z.string().min(8),
		})
		.strict(),
) {}

export class SignInDto extends createZodDto(
	z
		.object({
			email: z.string().nonempty().email(),
			password: z.string().min(8),
			stayLoggedIn: z.boolean(),
		})
		.strict(),
) {}

export class RefreshDto extends createZodDto(
	z
		.object({
			refreshToken: z.string().nonempty(),
		})
		.strict(),
) {}
