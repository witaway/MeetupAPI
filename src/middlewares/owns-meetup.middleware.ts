import { RequestHandler } from 'express';
import ResponseFormat from '@utils/response-format';
import MeetupService from '@services/meetup.service';
import { ForbiddenException } from '@utils/errors';
import { z } from 'zod';

const ownsMeetup = function (
	paramWithMeetupId: string,
): RequestHandler<any, any, any, any> {
	return async (req, res, next) => {
		const schema = z.coerce.number();
		const parsed = schema.safeParse(req.params[paramWithMeetupId]);
		if (!parsed.success) {
			return res
				.status(400)
				.send(
					ResponseFormat.error(
						400,
						`The request has the incorrect format`,
						parsed.error,
					),
				);
		}

		const meetupId = parsed.data;
		const userId = req.user!.id;

		const meetup = await MeetupService.getByID(meetupId);
		const meetupOwnerId = meetup.owner.id;

		if (userId !== meetupOwnerId) {
			throw new ForbiddenException("You haven't access to edit this resource");
		}

		return next();
	};
};

export default ownsMeetup;
