import { Router } from 'express';
import validate from '@middlewares/validate.middleware';
import {
	addTagToMeetupSchema,
	readAllTagsOfMeetupSchema,
	removeTagFromMeetupSchema,
} from '@dto/meetup-tags.dto';
import MeetupTagsController from '../controllers/meetup-tags.controller';
import errorsHandler from '@middlewares/errors-handler.middleware';

const meetupTagsRouter = Router({ mergeParams: true });

meetupTagsRouter.post(
	'/',
	validate(addTagToMeetupSchema),
	MeetupTagsController.addTagToMeetup,
);

meetupTagsRouter.get(
	'/',
	validate(readAllTagsOfMeetupSchema),
	MeetupTagsController.readAllTagsOfMeetup,
);

meetupTagsRouter.delete(
	'/:tagId',
	validate(removeTagFromMeetupSchema),
	MeetupTagsController.removeTagFromMeetup,
);

export default meetupTagsRouter;
