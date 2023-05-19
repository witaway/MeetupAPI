import { IsDefined, IsNumber } from 'class-validator';

export class AddTagToMeetupDto {
	@IsNumber()
	@IsDefined()
	public tagId!: number;
}
