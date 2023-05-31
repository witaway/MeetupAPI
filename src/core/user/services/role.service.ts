import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@core/user/repositories/role.repository';
import { CreateRoleDto, UpdateRoleDto } from '@core/user/dto/role.dto';
import { RoleInfo } from '@core/user/types';

@Injectable()
export class RoleService {
	constructor(private roleRepository: RoleRepository) {}

	public async create(roleDetails: CreateRoleDto): Promise<RoleInfo> {
		return this.roleRepository.create(roleDetails);
	}

	public async readList(): Promise<RoleInfo[]> {
		return this.roleRepository.readList();
	}

	public async readByRoleId(roleId: number): Promise<RoleInfo | null> {
		return this.roleRepository.readByRoleId(roleId);
	}

	public async updateByRoleId(
		roleId: number,
		roleDetails: UpdateRoleDto,
	): Promise<RoleInfo> {
		return this.roleRepository.updateByRoleId(roleId, roleDetails);
	}

	public async deleteByRoleId(roleId: number): Promise<RoleInfo> {
		return this.roleRepository.deleteByRoleId(roleId);
	}
}
