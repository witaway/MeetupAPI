import { IsDateString, IsDefined, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMeetupDto {
	@IsDefined()
	@IsString()
	@Length(5, 50)
	public theme!: string;

	@IsDefined()
	@IsString()
	@Length(5, 255)
	public description!: string;

	@IsDefined()
	@IsString()
	@Length(5, 255)
	public place!: string;

	@IsDefined()
	@IsDateString()
	@Type(() => Date)
	public time!: Date;
}

export class UpdateMeetupDto {
	@Length(5, 50)
	@IsString()
	public theme?: string;

	@Length(5, 255)
	@IsString()
	public description?: string;

	@Length(5, 255)
	@IsString()
	public place?: string;

	@Type(() => Date)
	@IsDateString()
	public time?: Date;
}
