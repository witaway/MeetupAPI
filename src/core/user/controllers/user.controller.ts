import {
	Body,
	ConflictException,
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
import { UserService } from '@core/user/services/user.service';
import { CreateUserDto, UpdateUserDto } from '@core/user/dto/user.dto';
import { ResponseMessage } from '@common/decorators';

@Controller('/users')
export class UserController {
	constructor(private userService: UserService) {}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('User created successfully')
	public async create(@Body() userDetails: CreateUserDto) {
		const existingUserWithSuchEmail = await this.userService.readByUserEmail(
			userDetails.email,
		);
		if (existingUserWithSuchEmail) {
			throw new ConflictException('The email is already taken');
		}
		return this.userService.create(userDetails);
	}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Users got successfully')
	public async readList() {
		return this.userService.readList();
	}

	@Get('/:userId')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('User got successfully')
	public async readByUserId(@Param('userId', ParseIntPipe) userId: number) {
		const user = await this.userService.readByUserId(userId);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	@Patch('/:userId')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('User updated successfully')
	public async updateByUserId(
		@Param('userId', ParseIntPipe) userId: number,
		@Body() userDetails: UpdateUserDto,
	) {
		const oldUser = await this.userService.readByUserId(userId);
		if (!oldUser) {
			throw new NotFoundException('User not found');
		}

		if (userDetails.email) {
			const userWithSuchEmail = await this.userService.readByUserEmail(
				userDetails.email,
			);
			if (userWithSuchEmail && userWithSuchEmail.id !== oldUser.id) {
				throw new ConflictException('The email is already taken');
			}
		}

		return this.userService.updateByUserId(userId, userDetails);
	}

	@Delete('/:userId')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ResponseMessage('User deleted successfully')
	public async deleteByUserId(@Param('roleId', ParseIntPipe) userId: number) {
		if (!(await this.userService.readByUserId(userId))) {
			throw new NotFoundException('User not found');
		}
		return this.userService.deleteByUserId(userId);
	}
}
