import { Role } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RoleInfo } from '@core/user/types';

@Injectable()
export class RoleRepository {
	constructor(private prisma: PrismaService) {}

	public async create(roleDetails: Omit<Role, 'id'>): Promise<RoleInfo> {
		return this.prisma.role.create({
			data: {
				name: roleDetails.name,
			},
		});
	}

	public async readList(): Promise<RoleInfo[]> {
		return this.prisma.role.findMany({
			select: {
				id: true,
				name: true,
			},
		});
	}

	public async readByRoleId(roleId: number): Promise<RoleInfo | null> {
		return this.prisma.role.findUnique({
			select: {
				id: true,
				name: true,
			},
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
			where: {
				id: roleId,
			},
			data: roleDetails,
		});
	}

	public async deleteByRoleId(roleId: number): Promise<RoleInfo> {
		return this.prisma.role.delete({
			where: {
				id: roleId,
			},
		});
	}
}
