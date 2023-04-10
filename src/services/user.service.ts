import UserRepository from '@repositories/user.repository';
import { ConflictException, NotFoundException } from '@utils/errors';
import { RegisterCredentials } from '@dto/definitions/auth.dto';

class UserService {
	static async create(personalInfo: RegisterCredentials) {
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

	static async updateByID(
		id: number,
		personalInfo: Partial<RegisterCredentials>,
	) {
		await UserService.getByID(id);
		return UserRepository.updateByID(id, personalInfo);
	}

	static async deleteByID(id: number) {
		await UserService.getByID(id);
		return UserRepository.deleteByID(id);
	}
}

export default UserService;
