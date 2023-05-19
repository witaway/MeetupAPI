import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Patch,
	Post,
} from '@nestjs/common';
import { TagService } from '@core/meetup/services';
import { CreateTagDto, UpdateTagDto } from '@core/meetup/dto/tag.dto';
import { ResponseMessage } from '@common/decorators';
import { IntParam } from '@common/decorators/int-param.decorator';

@Controller('tags')
export class TagController {
	constructor(private tagService: TagService) {}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Tag created successfully')
	public async create(@Body() tagDetails: CreateTagDto) {
		return await this.tagService.create(tagDetails);
	}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Tags got successfully')
	public async readList() {
		return await this.tagService.readList();
	}

	@Get('/:tagId')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Tag got successfully')
	public async readByTagId(@IntParam('tagId') tagId: number) {
		const tag = await this.tagService.readByMeetupId(tagId);
		if (!tag) {
			throw new NotFoundException('Tag is not found');
		}
		return tag;
	}

	@Patch('/:tagId')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Tag updated successfully')
	public async updateByTagId(
		@IntParam('tagId') tagId: number,
		@Body() tagDetails: UpdateTagDto,
	) {
		if (!(await this.tagService.isExists(tagId))) {
			throw new NotFoundException('Tag is not found');
		}
		return await this.tagService.updateByMeetupId(tagId, tagDetails);
	}

	@Delete('/:tagId')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ResponseMessage('Tag deleted successfully')
	public async deleteByTagId(@IntParam('tagId') tagId: number) {
		if (!(await this.tagService.isExists(tagId))) {
			throw new NotFoundException('Tag is not found');
		}
		return this.tagService.deleteByMeetupId(tagId);
	}
}
