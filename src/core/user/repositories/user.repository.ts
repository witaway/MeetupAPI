import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { selectUserInfo, UserInfo } from '@core/user/types';

@Injectable()
export class UserRepository {
	constructor(private prisma: PrismaService) {}

	public async create(userDetails: Omit<User, 'id'>): Promise<UserInfo> {
		return this.prisma.user.create({
			...selectUserInfo,
			data: {
				email: userDetails.email,
				name: userDetails.name,
				password: userDetails.password,
			},
		});
	}

	public async readList(): Promise<UserInfo[]> {
		return this.prisma.user.findMany({
			...selectUserInfo,
		});
	}

	public async readByUserId(userId: number): Promise<UserInfo | null> {
		return this.prisma.user.findUnique({
			...selectUserInfo,
			where: {
				id: userId,
			},
		});
	}

	public async readByUserEmail(userEmail: string): Promise<UserInfo | null> {
		return this.prisma.user.findUnique({
			...selectUserInfo,
			where: {
				email: userEmail,
			},
		});
	}

	public async updateByUserId(
		userId: number,
		userDetails: Partial<Omit<User, 'id'>>,
	): Promise<UserInfo> {
		return this.prisma.user.update({
			...selectUserInfo,
			where: {
				id: userId,
			},
			data: userDetails,
		});
	}

	public async deleteByUserId(userId: number): Promise<UserInfo> {
		return this.prisma.user.delete({
			...selectUserInfo,
			where: {
				id: userId,
			},
		});
	}
}
