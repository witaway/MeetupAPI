import {
	Body,
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
import { TagService } from '@core/meetup/services';
import { CreateTagDto, UpdateTagDto } from '@core/meetup/dto/tag.dto';

@Controller('tags')
export class TagController {
	constructor(private tagService: TagService) {}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() tagDetails: CreateTagDto) {
		return await this.tagService.create(tagDetails);
	}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	public async getList() {
		return await this.tagService.getList();
	}

	@Get('/:tagId')
	@HttpCode(HttpStatus.OK)
	public async getByID(@Param('tagId', ParseIntPipe) tagId: number) {
		const tag = await this.tagService.getByID(tagId);
		if (!tag) {
			throw new NotFoundException('Tag is not found');
		}
		return tag;
	}

	@Patch('/:tagId')
	@HttpCode(HttpStatus.OK)
	public async updateByID(
		@Param('tagId', ParseIntPipe) tagId: number,
		@Body() tagDetails: UpdateTagDto,
	) {
		if (!(await this.tagService.isExists(tagId))) {
			throw new NotFoundException('Tag is not found');
		}
		return await this.tagService.updateByID(tagId, tagDetails);
	}

	@Delete('/:tagId')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async deleteByID(@Param('tagId', ParseIntPipe) tagId: number) {
		if (!(await this.tagService.isExists(tagId))) {
			throw new NotFoundException('Tag is not found');
		}
		return this.tagService.deleteByID(tagId);
	}
}
