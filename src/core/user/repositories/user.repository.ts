import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserInfo } from '@core/user/types';

@Injectable()
export class UserRepository {
	constructor(private prisma: PrismaService) {}

	public async create(userDetails: Omit<User, 'id'>): Promise<UserInfo> {
		const user = await this.prisma.user.create({
			data: {
				email: userDetails.email,
				name: userDetails.name,
				password: userDetails.password,
			},
		});
		return user;
	}

	public async readList(): Promise<UserInfo[]> {
		const users = this.prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
			},
		});
		return users;
	}

	public async readByUserId(
		userId: number,
		includePassword = false,
	): Promise<UserInfo | null> {
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

	public async readByUserEmail(
		userEmail: string,
		includePassword = false,
	): Promise<UserInfo | null> {
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
	): Promise<UserInfo> {
		const newUser = this.prisma.user.update({
			where: {
				id: userId,
			},
			data: userDetails,
		});
		return newUser;
	}

	public async deleteByUserId(userId: number): Promise<UserInfo> {
		return this.prisma.user.delete({
			where: {
				id: userId,
			},
		});
	}
}
