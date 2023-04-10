import { Router } from 'express';
import validate from '@middlewares/validate.middleware';
import MeetupController from '../controllers/meetup.controller';
import tagsRouter from './tags.route';
import meetupTagsRouter from './meetup-tags.route';
import ownsMeetup from '@middlewares/owns-meetup.middleware';
import MeetupSchemas from '@dto/schemas/meetup.dto';

const meetupsRouter = Router();
meetupsRouter.use('/tags', tagsRouter);

// User's controllers
meetupsRouter.post(
	'/',
	validate(MeetupSchemas.create),
	MeetupController.create,
);
meetupsRouter.get(
	'/',
	validate(MeetupSchemas.readAll),
	MeetupController.readAll,
);
meetupsRouter.get(
	'/:meetupId',
	validate(MeetupSchemas.read),
	MeetupController.readById,
);

// Editor's controllers
meetupsRouter.use('/:meetupId/tags', ownsMeetup('meetupId'), meetupTagsRouter);
meetupsRouter.put(
	'/:meetupId',
	validate(MeetupSchemas.update),
	ownsMeetup('meetupId'),
	MeetupController.update,
);
meetupsRouter.delete(
	'/:meetupId',
	validate(MeetupSchemas.delete),
	ownsMeetup('meetupId'),
	MeetupController.delete,
);

export default meetupsRouter;
