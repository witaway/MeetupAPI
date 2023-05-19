import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
	@IsNotEmpty()
	@IsString()
	@IsDefined()
	public name!: string;
}

export class UpdateRoleDto {
	@IsNotEmpty()
	@IsString()
	@IsDefined()
	public name?: string;
}
