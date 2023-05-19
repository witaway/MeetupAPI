import { UserRepository } from '@core/user/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@core/user/dto/user.dto';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	public async create(userDetails: CreateUserDto) {
		return this.userRepository.create(userDetails);
	}

	public async readList() {
		return this.userRepository.readList();
	}

	public async readByUserId(userId: number) {
		return this.userRepository.readByUserId(userId);
	}

	public async readByUserEmail(userEmail: string) {
		return this.userRepository.readByUserEmail(userEmail);
	}

	public async updateByUserId(userId: number, userDetails: UpdateUserDto) {
		return this.userRepository.updateByUserId(userId, userDetails);
	}

	public async deleteByUserId(userId: number) {
		return this.userRepository.deleteByUserId(userId);
	}
}
