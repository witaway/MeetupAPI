import { Role } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RoleRepository {
	constructor(private prisma: PrismaService) {}

	public async create(roleDetails: Omit<Role, 'id'>) {
		return this.prisma.role.create({
			data: {
				name: roleDetails.name,
			},
		});
	}

	public async readList() {
		return this.prisma.role.findMany({
			select: {
				id: true,
				name: true,
			},
		});
	}

	public async readByRoleId(roleId: number) {
		return this.prisma.user.findUnique({
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
	) {
		return this.prisma.user.update({
			where: {
				id: roleId,
			},
			data: roleDetails,
		});
	}

	public async deleteByRoleId(roleId: number) {
		await this.prisma.role.delete({
			where: {
				id: roleId,
			},
		});
	}
}
