import { Injectable } from '@nestjs/common';
import { UserRolesRepository } from '@core/user/repositories/user-roles.repository';
import { RoleInfo } from '@core/user/types';

@Injectable()
export class UserRolesService {
	constructor(private userRolesRepository: UserRolesRepository) {}

	public async isRoleGivenByUserId(
		userId: number,
		roleId: number,
	): Promise<boolean> {
		const roles = await this.userRolesRepository.readRolesListByUserId(userId);
		const isRoleGiven = roles.some((role) => role.id === roleId);
		return isRoleGiven;
	}

	public async readRolesListByUserId(userId: number): Promise<RoleInfo[]> {
		return this.userRolesRepository.readRolesListByUserId(userId);
	}

	public async grantRoleByUserId(
		userId: number,
		roleId: number,
	): Promise<RoleInfo> {
		return this.userRolesRepository.appendRoleByUserId(userId, roleId);
	}

	public async revokeRoleByUserId(
		userId: number,
		roleId: number,
	): Promise<RoleInfo> {
		return this.userRolesRepository.removeRoleByUserId(userId, roleId);
	}
}
