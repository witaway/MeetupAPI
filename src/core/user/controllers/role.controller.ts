import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '@core/user/dto/role.dto';
import { RoleService } from '@core/user/services/role.service';
import { ResponseMessage } from '@common/decorators';

@Controller('/roles')
export class RoleController {
	constructor(private roleService: RoleService) {}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Role created successfully')
	public async create(@Body() roleDetails: CreateRoleDto) {
		return await this.roleService.create(roleDetails);
	}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Roles got successfully')
	public async readList() {
		return this.roleService.readList();
	}

	@Get('/:roleId')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Role got successfully')
	public async readByRoleId(@Param('roleId', ParseIntPipe) roleId: number) {
		const role = await this.roleService.readByRoleId(roleId);
		if (!role) {
			throw new NotFoundException('Role not found');
		}
		return role;
	}

	@Patch('/:roleId')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Role updated successfully')
	public async updateByRoleId(
		@Param('roleId', ParseIntPipe) roleId: number,
		@Body() roleDetails: UpdateRoleDto,
	) {
		const oldRole = await this.roleService.readByRoleId(roleId);
		if (!oldRole) {
			throw new NotFoundException('Role not found');
		}
		return this.roleService.updateByRoleId(roleId, roleDetails);
	}

	@Delete('/:roleId')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ResponseMessage('Role deleted successfully')
	public async deleteByUserId(@Param('roleId', ParseIntPipe) roleId: number) {
		if (!(await this.roleService.readByRoleId(roleId))) {
			throw new NotFoundException('Role not found');
		}
		return this.roleService.deleteByRoleId(roleId);
	}
}
