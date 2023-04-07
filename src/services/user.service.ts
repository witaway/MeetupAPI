import UserRepository from '@repositories/user.repository';
import { ConflictException, NotFoundException } from '@utils/errors';
import { User } from '@prisma/client';

class UserService {
	static async create(personalInfo: Omit<User, 'id'>) {
		const userWithGivenEmail = await UserRepository.getByEmail(
			personalInfo.email,
		);
		if (userWithGivenEmail) {
			throw new ConflictException('This email is already in use');
		}
		return UserRepository.create(personalInfo);
	}

	static async getList() {
		return UserRepository.getList();
	}

	static async getByID(id: number) {
		const user = await UserRepository.getByID(id);
		if (!user) {
			throw new NotFoundException('User is not found');
		}
		return user;
	}

	static async updateByID(id: number, personalInfo: Omit<User, 'id'>) {
		await UserService.getByID(id);
		return UserRepository.updateByID(id, personalInfo);
	}

	static async deleteByID(id: number) {
		await UserService.getByID(id);
		await UserRepository.deleteByID(id);
	}
}

export default UserService;
