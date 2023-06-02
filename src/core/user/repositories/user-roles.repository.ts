import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { selectRoleInfo, RoleInfo } from '@core/user/types';

@Injectable()
export class UserRolesRepository {
	constructor(private prisma: PrismaService) {}

	public async readRolesListByUserId(userId: number): Promise<RoleInfo[]> {
		return this.prisma.role.findMany({
			...selectRoleInfo,
			where: {
				users: {
					some: {
						id: userId,
					},
				},
			},
		});
	}

	public async appendRoleByUserId(
		userId: number,
		roleId: number,
	): Promise<RoleInfo> {
		return this.prisma.role.update({
			...selectRoleInfo,
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

	public removeRoleByUserId(userId: number, roleId: number): Promise<RoleInfo> {
		return this.prisma.role.update({
			...selectRoleInfo,
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
