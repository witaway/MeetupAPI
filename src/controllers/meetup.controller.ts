import ResponseFormat from '@utils/response-format';
import { Response } from 'express-serve-static-core';
import { TypedRequest } from '@customTypes/express-typed-request';
import MeetupService from '@services/meetup.service';
import MeetupSchemas from '@dto/schemas/meetup.dto';

class MeetupController {
	static async create(
		req: TypedRequest<typeof MeetupSchemas.create>,
		res: Response,
	) {
		const meetup = await MeetupService.create(req!.user!.id, req.body);
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Meetup created successfully', meetup));
	}

	static async update(
		req: TypedRequest<typeof MeetupSchemas.update>,
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
		req: TypedRequest<typeof MeetupSchemas.readAll>,
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
		req: TypedRequest<typeof MeetupSchemas.read>,
		res: Response,
	) {
		const meetup = await MeetupService.getByID(req.params.meetupId);
		res
			.status(200)
			.json(ResponseFormat.success(200, 'Meetup is got successfully', meetup));
	}

	static async delete(
		req: TypedRequest<typeof MeetupSchemas.delete>,
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
