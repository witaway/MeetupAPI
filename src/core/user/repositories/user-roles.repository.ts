import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserRolesRepository {
	constructor(private prisma: PrismaService) {}

	public async readRolesListByUserId(userId: number) {
		return this.prisma.role.findMany({
			select: {
				id: true,
				name: true,
			},
			where: {
				users: {
					some: {
						id: userId,
					},
				},
			},
		});
	}

	public async appendRoleByUserId(userId: number, roleId: number) {
		return this.prisma.role.update({
			where: {
				id: roleId,
			},
			data: {
				users: {
					connect: {
						id: userId,
					},
				},
			},
		});
	}

	public removeRoleByUserId(userId: number, roleId: number) {
		return this.prisma.role.update({
			where: {
				id: roleId,
			},
			data: {
				users: {
					disconnect: {
						id: userId,
					},
				},
			},
		});
	}
}
