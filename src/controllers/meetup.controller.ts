import ResponseFormat from '@utils/response-format';
import { NextFunction, Response } from 'express-serve-static-core';
import { TypedRequest } from '@customTypes/express-typed-request';
import {
	createMeetupSchema,
	deleteMeetupSchema,
	readAllMeetupsSchema,
	readMeetupSchema,
	updateMeetupSchema,
} from '@dto/meetups.dto';
import MeetupService from '@services/meetup.service';

class MeetupController {
	static async create(
		req: TypedRequest<typeof createMeetupSchema>,
		res: Response,
	) {
		const meetup = await MeetupService.create(req!.user!.id, req.body);
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Meetup created successfully', meetup));
	}

	static async update(
		req: TypedRequest<typeof updateMeetupSchema>,
		res: Response,
	) {
		const updatedMeetup = await MeetupService.updateByID(
			req!.user!.id,
			req.params.meetupId,
			req.body,
		);
		res
			.status(200)
			.json(
				ResponseFormat.success(
					200,
					'Meetup updated successfully',
					updatedMeetup,
				),
			);
	}

	static async readAll(
		req: TypedRequest<typeof readAllMeetupsSchema>,
		res: Response,
	) {
		const meetupsList = await MeetupService.getList();
		res
			.status(200)
			.json(
				ResponseFormat.success(
					200,
					'List of meetups is got successfully',
					meetupsList,
				),
			);
	}

	static async readById(
		req: TypedRequest<typeof readMeetupSchema>,
		res: Response,
	) {
		const meetup = await MeetupService.getByID(req.params.meetupId);
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Meetup is got successfully', meetup));
	}

	static async delete(
		req: TypedRequest<typeof deleteMeetupSchema>,
		res: Response,
	) {
		const deletedMeetup = await MeetupService.deleteByID(
			req!.user!.id,
			req.params.meetupId,
		);
		res
			.status(200)
			.json(
				ResponseFormat.success(
					200,
					'Meetup deleted successfully',
					deletedMeetup,
				),
			);
	}
}

export default MeetupController;
