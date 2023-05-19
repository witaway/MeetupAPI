import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import {
	CurrentUserController,
	CurrentUserRolesController,
	RoleController,
	UserController,
	UserRolesController,
} from '@core/user/controllers';
import {
	RoleRepository,
	UserRepository,
	UserRolesRepository,
} from '@core/user/repositories';
import {
	RoleService,
	UserRolesService,
	UserService,
} from '@core/user/services';

@Module({
	imports: [PrismaModule],
	controllers: [
		UserController,
		CurrentUserController,
		RoleController,
		CurrentUserRolesController,
		UserRolesController,
	],
	providers: [
		RoleRepository,
		UserRepository,
		UserRolesRepository,
		RoleService,
		UserService,
		UserRolesService,
	],
	exports: [RoleService, UserService, UserRolesService],
})
export class UserModule {}
