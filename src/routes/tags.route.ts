import { Router } from 'express';
import validate from '@middlewares/validate.middleware';
import {
	createTagSchema,
	deleteTagSchema,
	readAllTagsSchema,
	readTagSchema,
	updateTagSchema,
} from '@dto/tags.dto';
import TagsController from '../controllers/tags.controller';

const tagsRouter = Router();

tagsRouter.post('/', validate(createTagSchema), TagsController.create);

tagsRouter.put('/:tagId', validate(updateTagSchema), TagsController.update);

tagsRouter.get('/', validate(readAllTagsSchema), TagsController.readAll);

tagsRouter.get('/:tagId', validate(readTagSchema), TagsController.readById);

tagsRouter.delete('/:tagId', validate(deleteTagSchema), TagsController.delete);

export default tagsRouter;
