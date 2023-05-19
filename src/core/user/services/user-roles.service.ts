import { Injectable } from '@nestjs/common';
import { UserRolesRepository } from '@core/user/repositories/user-roles.repository';

@Injectable()
export class UserRolesService {
	constructor(private userRolesRepository: UserRolesRepository) {}

	public async isRoleGivenByUserId(userId: number, roleId: number) {
		const roles = await this.userRolesRepository.readRolesListByUserId(userId);
		const isRoleGiven = roles.some((role) => role.id === roleId);
		return isRoleGiven;
	}

	public async readRolesListByUserId(userId: number) {
		return this.userRolesRepository.readRolesListByUserId(userId);
	}

	public async grantRoleByUserId(userId: number, roleId: number) {
		return this.userRolesRepository.appendRoleByUserId(userId, roleId);
	}

	public async revokeRoleByUserId(userId: number, roleId: number) {
		return this.userRolesRepository.removeRoleByUserId(userId, roleId);
	}
}
