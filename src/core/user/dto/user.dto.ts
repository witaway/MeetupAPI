import {
	IsDefined,
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	@IsString()
	@IsDefined()
	public email!: string;

	@IsNotEmpty()
	@IsString()
	@IsDefined()
	public name!: string;

	@MinLength(8)
	@IsString()
	@IsDefined()
	public password!: string;
}

export class UpdateUserDto {
	@IsEmail()
	@IsNotEmpty()
	@IsString()
	public email?: string;

	@IsNotEmpty()
	@IsString()
	public name?: string;

	@MinLength(8)
	@IsString()
	public password?: string;
}
