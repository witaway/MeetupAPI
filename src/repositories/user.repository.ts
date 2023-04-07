import prisma from '@database/index';
import { User } from '@prisma/client';
import { generateHash } from '@utils/crypto';

class UserRepository {
	static async create(personalInfo: Omit<User, 'id'>) {
		const user = await prisma.user.create({
			data: {
				email: personalInfo.email,
				name: personalInfo.name,
				password: generateHash(personalInfo.password),
			},
		});
		return user;
	}

	static async getList() {
		const users = prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
			},
		});
		return users;
	}

	static async updateByID(id: number, personalInfo: Partial<Omit<User, 'id'>>) {
		if (personalInfo.password) {
			personalInfo.password = generateHash(personalInfo.password);
		}
		const newUser = prisma.user.update({
			where: {
				id,
			},
			data: personalInfo,
		});
		return newUser;
	}

	static async deleteByID(id: number) {
		await prisma.user.delete({
			where: {
				id,
			},
		});
	}

	static async getByID(id: number, includePassword = false) {
		const user = await prisma.user.findUnique({
			select: {
				id: true,
				name: true,
				email: true,
				password: includePassword,
			},
			where: {
				id,
			},
		});
		return user;
	}

	static async getByEmail(email: string, includePassword = false) {
		const user = await prisma.user.findUnique({
			select: {
				id: true,
				name: true,
				email: true,
				password: includePassword,
			},
			where: {
				email,
			},
		});
		return user;
	}
}

export default UserRepository;
