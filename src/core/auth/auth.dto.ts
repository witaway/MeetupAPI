import {
	IsBoolean,
	IsDefined,
	IsEmail,
	IsJWT,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator';

export class SignUpDto {
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

export class SignInDto {
	@IsEmail()
	@IsNotEmpty()
	@IsString()
	@IsDefined()
	public email!: string;

	@MinLength(8)
	@IsString()
	@IsDefined()
	public password!: string;

	@IsNotEmpty()
	@IsBoolean()
	@IsDefined()
	public stayLoggedIn!: boolean;
}

export class RefreshDto {
	@IsJWT()
	@IsNotEmpty()
	@IsString()
	@IsDefined()
	public refreshToken!: string;
}
