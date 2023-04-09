import { ForbiddenException, NotFoundException } from '@utils/errors';
import { MeetupInfo } from '@dto/meetup.dto';
import MeetupRepository from '@repositories/meetup.repository';

class MeetupService {
	static async create(ownerId: number, meetupInfo: MeetupInfo) {
		const meetup = await MeetupRepository.create(ownerId, meetupInfo);
		return meetup;
	}

	static async getList() {
		const meetups = await MeetupRepository.readList();
		return meetups;
	}

	static async getByID(id: number) {
		const meetup = await MeetupRepository.readByID(id);
		if (!meetup) {
			throw new NotFoundException('Meetup is not found');
		}
		return meetup;
	}

	static async updateByID(
		requesterId: number,
		meetupId: number,
		meetupInfo: Partial<MeetupInfo>,
	) {
		const meetup = await MeetupService.getByID(meetupId);
		if (meetup.owner.id !== requesterId) {
			throw new ForbiddenException("You haven't rights to edit the meetup");
		}
		return MeetupRepository.updateByID(meetupId, meetupInfo);
	}

	static async deleteByID(requesterId: number, meetupId: number) {
		const meetup = await MeetupService.getByID(meetupId);
		if (meetup.owner.id !== requesterId) {
			throw new ForbiddenException("You haven't rights to delete the meetup");
		}
		return MeetupRepository.deleteByID(meetupId);
	}
}

export default MeetupService;
