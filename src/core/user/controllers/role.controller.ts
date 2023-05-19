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

@Controller('/roles')
export class RoleController {
	constructor(private roleService: RoleService) {}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() roleDetails: CreateRoleDto) {
		return await this.roleService.create(roleDetails);
	}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	public async readList() {
		return this.roleService.readList();
	}

	@Get('/:roleId')
	@HttpCode(HttpStatus.OK)
	public async readByRoleId(@Param('roleId', ParseIntPipe) roleId: number) {
		const role = await this.roleService.readByRoleId(roleId);
		if (!role) {
			throw new NotFoundException('Role not found');
		}
		return role;
	}

	@Patch('/:roleId')
	@HttpCode(HttpStatus.OK)
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
	public async deleteByUserId(@Param('roleId', ParseIntPipe) roleId: number) {
		if (!(await this.roleService.readByRoleId(roleId))) {
			throw new NotFoundException('Role not found');
		}
		return this.roleService.deleteByRoleId(roleId);
	}
}
