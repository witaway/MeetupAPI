import { Role } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { selectRoleInfo, RoleInfo } from '@core/user/types';

@Injectable()
export class RoleRepository {
	constructor(private prisma: PrismaService) {}

	public async create(roleDetails: Omit<Role, 'id'>): Promise<RoleInfo> {
		return this.prisma.role.create({
			...selectRoleInfo,
			data: {
				name: roleDetails.name,
			},
		});
	}

	public async readList(): Promise<RoleInfo[]> {
		return this.prisma.role.findMany({
			...selectRoleInfo,
			select: {
				id: true,
				name: true,
			},
		});
	}

	public async readByRoleId(roleId: number): Promise<RoleInfo | null> {
		return this.prisma.role.findUnique({
			...selectRoleInfo,
			where: {
				id: roleId,
			},
		});
	}

	public async updateByRoleId(
		roleId: number,
		roleDetails: Partial<Omit<Role, 'id'>>,
	): Promise<RoleInfo> {
		return this.prisma.role.update({
			...selectRoleInfo,
			where: {
				id: roleId,
			},
			data: roleDetails,
		});
	}

	public async deleteByRoleId(roleId: number): Promise<RoleInfo> {
		return this.prisma.role.delete({
			...selectRoleInfo,
			where: {
				id: roleId,
			},
		});
	}
}
