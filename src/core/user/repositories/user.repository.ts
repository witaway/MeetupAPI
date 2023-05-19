import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { hash } from '@common/utils';

@Injectable()
export class UserRepository {
	constructor(private prisma: PrismaService) {}

	public async create(userDetails: Omit<User, 'id'>) {
		const user = await this.prisma.user.create({
			data: {
				email: userDetails.email,
				name: userDetails.name,
				password: userDetails.password,
			},
		});
		return user;
	}

	public async readList() {
		const users = this.prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
			},
		});
		return users;
	}

	public async readByUserId(userId: number, includePassword = false) {
		const user = await this.prisma.user.findUnique({
			select: {
				id: true,
				name: true,
				email: true,
				password: includePassword,
			},
			where: {
				id: userId,
			},
		});
		return user;
	}

	public async readByUserEmail(userEmail: string, includePassword = false) {
		const user = await this.prisma.user.findUnique({
			select: {
				id: true,
				name: true,
				email: true,
				password: includePassword,
			},
			where: {
				email: userEmail,
			},
		});
		return user;
	}

	public async updateByUserId(
		userId: number,
		userDetails: Partial<Omit<User, 'id'>>,
	) {
		const newUser = this.prisma.user.update({
			where: {
				id: userId,
			},
			data: userDetails,
		});
		return newUser;
	}

	public async deleteByUserId(userId: number) {
		await this.prisma.user.delete({
			where: {
				id: userId,
			},
		});
	}
}
