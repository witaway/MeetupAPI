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

const meetupRouter = Router();

meetupRouter.post('/', validate(createMeetupSchema), MeetupController.create);
meetupRouter.put(
	'/:meetupId',
	validate(updateMeetupSchema),
	MeetupController.update,
);
meetupRouter.get('/', validate(readAllMeetupsSchema), MeetupController.readAll);
meetupRouter.get(
	'/:meetupId',
	validate(readMeetupSchema),
	MeetupController.readById,
);
meetupRouter.delete(
	'/:meetupId',
	validate(deleteMeetupSchema),
	MeetupController.delete,
);

export default meetupRouter;
