import { IsDefined, IsNumber } from 'class-validator';

export class GrantRoleToUserDto {
	@IsNumber()
	@IsDefined()
	public roleId!: number;
}
