import {
	Body,
	ConflictException,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch,
} from '@nestjs/common';
import { UserService } from '@core/user/services/user.service';
import { UpdateUserDto } from '@core/user/dto/user.dto';
import { GetUser } from '@common/decorators/get-user.decorator';
import { User } from '@common/types/user.types';
import { ResponseMessage } from '@common/decorators';
import { UserInfo } from '@core/user/types';
import { ApiCookieAuth } from '@nestjs/swagger';

@ApiCookieAuth()
@Controller('/users/current')
export class CurrentUserController {
	constructor(private userService: UserService) {}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Authenticated user info got successfully')
	public async read(@GetUser() user: User): Promise<UserInfo | null> {
		return user;
	}

	@Patch('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Authenticated user info updated successfully')
	public async update(
		@GetUser() user: User,
		@Body() userDetails: UpdateUserDto,
	): Promise<UserInfo | null> {
		if (userDetails.email) {
			const userWithSuchEmail = await this.userService.readByUserEmail(
				userDetails.email,
			);
			if (userWithSuchEmail && userWithSuchEmail.id !== user.id) {
				throw new ConflictException('The email is already taken');
			}
		}
		return this.userService.updateByUserId(user.id, userDetails);
	}
}
