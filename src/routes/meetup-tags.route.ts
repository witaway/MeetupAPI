import { Router } from 'express';
import validate from '@middlewares/validate.middleware';
import MeetupTagsController from '../controllers/meetup-tags.controller';
import MeetupTagsSchemas from '@dto/schemas/meetup-tags.dto';

const meetupTagsRouter = Router({ mergeParams: true });

meetupTagsRouter.post(
	'/',
	validate(MeetupTagsSchemas.addTagToMeetup),
	MeetupTagsController.addTagToMeetup,
);

meetupTagsRouter.get(
	'/',
	validate(MeetupTagsSchemas.readAll),
	MeetupTagsController.readAllTagsOfMeetup,
);

meetupTagsRouter.delete(
	'/:tagId',
	validate(MeetupTagsSchemas.removeFromMeetup),
	MeetupTagsController.removeTagFromMeetup,
);

export default meetupTagsRouter;
