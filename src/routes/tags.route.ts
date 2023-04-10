import { Router } from 'express';
import validate from '@middlewares/validate.middleware';
import TagsController from '../controllers/tags.controller';
import TagSchemas from '@dto/schemas/tags.dto';

const tagsRouter = Router();

tagsRouter.post('/', validate(TagSchemas.create), TagsController.create);

tagsRouter.put('/:tagId', validate(TagSchemas.update), TagsController.update);

tagsRouter.get('/', validate(TagSchemas.readAll), TagsController.readAll);

tagsRouter.get('/:tagId', validate(TagSchemas.read), TagsController.readById);

tagsRouter.delete(
	'/:tagId',
	validate(TagSchemas.delete),
	TagsController.delete,
);

export default tagsRouter;
