import { Router } from 'express';
import validate from '@middlewares/validate.middleware';
import {
	createMeetupSchema,
	deleteMeetupSchema,
	readAllMeetupsSchema,
	readMeetupSchema,
	updateMeetupSchema,
} from '@dto/meetup.dto';
import MeetupController from '../controllers/meetup.controller';
import tagsRouter from './tags.route';
import meetupTagsRouter from './meetup-tags.route';
import ownsMeetup from '@middlewares/owns-meetup.middleware';

const meetupsRouter = Router();
meetupsRouter.use('/tags', tagsRouter);

// User's controllers
meetupsRouter.post('/', validate(createMeetupSchema), MeetupController.create);
meetupsRouter.get(
	'/',
	validate(readAllMeetupsSchema),
	MeetupController.readAll,
);
meetupsRouter.get(
	'/:meetupId',
	validate(readMeetupSchema),
	MeetupController.readById,
);

// Editor's controllers
meetupsRouter.use('/:meetupId/tags', ownsMeetup('meetupId'), meetupTagsRouter);
meetupsRouter.put(
	'/:meetupId',
	validate(updateMeetupSchema),
	ownsMeetup('meetupId'),
	MeetupController.update,
);
meetupsRouter.delete(
	'/:meetupId',
	validate(deleteMeetupSchema),
	ownsMeetup('meetupId'),
	MeetupController.delete,
);

export default meetupsRouter;
