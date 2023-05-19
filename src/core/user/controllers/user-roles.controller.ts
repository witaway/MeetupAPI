import {
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { UserRolesService } from '@core/user/services/user-roles.service';
import { GrantRoleToUserDto } from '@core/user/dto/user-roles.dto';
import { ResponseMessage } from '@common/decorators';

@Controller('/users/:userId/roles')
export class UserRolesController {
	constructor(private userRolesService: UserRolesService) {}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Roles granted to user got successfully')
	public async readRolesListByUserId(
		@Param('userId', ParseIntPipe) userId: number,
	) {
		return await this.userRolesService.readRolesListByUserId(userId);
	}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Role granted to user successfully')
	public async grantRoleByUserId(
		@Param('userId', ParseIntPipe) userId: number,
		@Body() body: GrantRoleToUserDto,
	) {
		const isRoleAlreadyGranted =
			await this.userRolesService.isRoleGivenByUserId(userId, body.roleId);
		if (isRoleAlreadyGranted) {
			throw new ConflictException('The role is already granted');
		}
		return await this.userRolesService.grantRoleByUserId(userId, body.roleId);
	}

	@Delete('/:roleId')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ResponseMessage('Role revoked from user successfully')
	public async revokeRoleByUserId(
		@Param('userId', ParseIntPipe) userId: number,
		@Param('roleId', ParseIntPipe) roleId: number,
	) {
		const isRoleAlreadyGranted =
			await this.userRolesService.isRoleGivenByUserId(userId, roleId);
		if (!isRoleAlreadyGranted) {
			throw new ConflictException('The role is already revoked');
		}
		await this.userRolesService.revokeRoleByUserId(userId, roleId);
		return {};
	}
}
