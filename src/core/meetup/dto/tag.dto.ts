import { IsDefined, IsString, Length } from 'class-validator';

export class CreateTagDto {
	@Length(1, 255)
	@IsString()
	@IsDefined()
	public name!: string;
}

export class UpdateTagDto {
	@Length(1, 255)
	@IsString()
	@IsDefined()
	public name!: string;
}
