import {
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { UserRolesService } from '@core/user/services/user-roles.service';
import { GrantRoleToUserDto } from '@core/user/dto/user-roles.dto';
import { ResponseMessage } from '@common/decorators';
import { IntParam } from '@common/decorators/int-param.decorator';
import { EmptyResponse, ReadAllResult } from '@common/types';
import { RoleInfo } from '@core/user/types';
import { ApiCookieAuth } from '@nestjs/swagger';

@ApiCookieAuth()
@Controller('/users/:userId/roles')
export class UserRolesController {
	constructor(private userRolesService: UserRolesService) {}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Roles granted to user got successfully')
	public async readRolesListByUserId(
		@IntParam('userId') userId: number,
	): Promise<ReadAllResult<RoleInfo>> {
		const roles = await this.userRolesService.readRolesListByUserId(userId);
		return {
			totalRecordsNumber: roles.length,
			entities: roles,
		};
	}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Role granted to user successfully')
	public async grantRoleByUserId(
		@IntParam('userId') userId: number,
		@Body() body: GrantRoleToUserDto,
	): Promise<RoleInfo> {
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
		@IntParam('userId') userId: number,
		@IntParam('roleId') roleId: number,
	): Promise<EmptyResponse> {
		const isRoleAlreadyGranted =
			await this.userRolesService.isRoleGivenByUserId(userId, roleId);
		if (!isRoleAlreadyGranted) {
			throw new ConflictException('The role is already revoked');
		}
		await this.userRolesService.revokeRoleByUserId(userId, roleId);
		return {};
	}
}
