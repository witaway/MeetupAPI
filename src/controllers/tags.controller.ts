import ResponseFormat from '@utils/response-format';
import { Response } from 'express-serve-static-core';
import { TypedRequest } from '@customTypes/express-typed-request';
import TagService from '@services/tag.service';
import TagSchemas from '@dto/schemas/tags.dto';

class TagsController {
	static async create(
		req: TypedRequest<typeof TagSchemas.create>,
		res: Response,
	) {
		const tag = await TagService.create(req.body);
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Tag created successfully', tag));
	}

	static async update(
		req: TypedRequest<typeof TagSchemas.update>,
		res: Response,
	) {
		const updatedTag = await TagService.updateByID(req.params.tagId, req.body);
		res
			.status(200)
			.json(
				ResponseFormat.success(200, 'Tag updated successfully', updatedTag),
			);
	}

	static async readAll(
		req: TypedRequest<typeof TagSchemas.readAll>,
		res: Response,
	) {
		const tags = await TagService.getList();
		res
			.status(200)
			.json(
				ResponseFormat.success(200, 'List of tags is got successfully', tags),
			);
	}

	static async readById(
		req: TypedRequest<typeof TagSchemas.read>,
		res: Response,
	) {
		const tag = await TagService.getByID(req.params.tagId);
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Tag is got successfully', tag));
	}

	static async delete(
		req: TypedRequest<typeof TagSchemas.delete>,
		res: Response,
	) {
		const deletedTag = await TagService.deleteByID(req.params.tagId);
		res
			.status(200)
			.json(
				ResponseFormat.success(200, 'Tag deleted successfully', deletedTag),
			);
	}
}

export default TagsController;
