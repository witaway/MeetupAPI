import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@core/user/repositories/role.repository';
import { CreateRoleDto, UpdateRoleDto } from '@core/user/dto/role.dto';

@Injectable()
export class RoleService {
	constructor(private roleRepository: RoleRepository) {}

	public async create(roleDetails: CreateRoleDto) {
		return this.roleRepository.create(roleDetails);
	}

	public async readList() {
		return this.roleRepository.readList();
	}

	public async readByRoleId(roleId: number) {
		return this.roleRepository.readByRoleId(roleId);
	}

	public async updateByRoleId(roleId: number, roleDetails: UpdateRoleDto) {
		return this.roleRepository.updateByRoleId(roleId, roleDetails);
	}

	public async deleteByRoleId(roleId: number) {
		return this.roleRepository.deleteByRoleId(roleId);
	}
}
