import { Role } from '@prisma/client';

export interface User {
	roles: Role[];
	id: number;
	name: string;
	email: string;
	password: string;
}
