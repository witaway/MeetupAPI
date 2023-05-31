import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserRolesService } from '@core/user/services/user-roles.service';
import { GetUser } from '@common/decorators/get-user.decorator';
import { User } from '@common/types/user.types';
import { ResponseMessage } from '@common/decorators';
import { ReadAllResult } from '@common/types';
import { RoleInfo } from '@core/user/types';
import { ApiCookieAuth } from '@nestjs/swagger';

@ApiCookieAuth()
@Controller('/users/current/roles')
export class CurrentUserRolesController {
	constructor(private userRolesService: UserRolesService) {}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Roles granted to authenticated user got successfully')
	public async readRolesList(
		@GetUser() user: User,
	): Promise<ReadAllResult<RoleInfo>> {
		const roles = await this.userRolesService.readRolesListByUserId(user.id);
		return {
			totalRecordsNumber: roles.length,
			entities: roles,
		};
	}
}
