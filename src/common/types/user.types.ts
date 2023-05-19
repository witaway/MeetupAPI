import { Role } from '@prisma/client';

export interface IUser {
	roles: Role[];
	id: number;
	name: string;
	email: string;
	password: string;
}
