import { Role } from '@prisma/client';

export {};
declare global {
	namespace Express {
		export interface User {
			roles: Role[];
			id: number;
			name: string;
			email: string;
			password: string;
		}
		export interface Request {
			user?: User;
		}
	}
}
