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
import { TagInfo } from '../types';
import { EmptyResponse, ReadAllResult } from '@common/types';

@Controller('tags')
export class TagController {
	constructor(private tagService: TagService) {}

	@Post('/')
	@HttpCode(HttpStatus.CREATED)
	@ResponseMessage('Tag created successfully')
	public async create(@Body() tagDetails: CreateTagDto): Promise<TagInfo> {
		return await this.tagService.create(tagDetails);
	}

	@Get('/')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Tags got successfully')
	public async readList(): Promise<ReadAllResult<TagInfo>> {
		const tags = await this.tagService.readList();
		return {
			totalRecordsNumber: tags.length,
			entities: tags,
		};
	}

	@Get('/:tagId')
	@HttpCode(HttpStatus.OK)
	@ResponseMessage('Tag got successfully')
	public async readByTagId(@IntParam('tagId') tagId: number): Promise<TagInfo> {
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
	): Promise<TagInfo> {
		if (!(await this.tagService.isExists(tagId))) {
			throw new NotFoundException('Tag is not found');
		}
		return await this.tagService.updateByMeetupId(tagId, tagDetails);
	}

	@Delete('/:tagId')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ResponseMessage('Tag deleted successfully')
	public async deleteByTagId(
		@IntParam('tagId') tagId: number,
	): Promise<EmptyResponse> {
		if (!(await this.tagService.isExists(tagId))) {
			throw new NotFoundException('Tag is not found');
		}
		await this.tagService.deleteByMeetupId(tagId);
		return {};
	}
}
