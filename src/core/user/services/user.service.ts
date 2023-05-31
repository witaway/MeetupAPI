import { UserRepository } from '@core/user/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@core/user/dto/user.dto';
import { UserInfo } from '@core/user/types';

@Injectable()
export class UserService {
	constructor(private userRepository: UserRepository) {}

	public async create(userDetails: CreateUserDto): Promise<UserInfo> {
		return this.userRepository.create(userDetails);
	}

	public async readList(): Promise<UserInfo[]> {
		return this.userRepository.readList();
	}

	public async readByUserId(userId: number): Promise<UserInfo | null> {
		return this.userRepository.readByUserId(userId);
	}

	public async readByUserEmail(userEmail: string): Promise<UserInfo | null> {
		return this.userRepository.readByUserEmail(userEmail);
	}

	public async updateByUserId(
		userId: number,
		userDetails: UpdateUserDto,
	): Promise<UserInfo | null> {
		return this.userRepository.updateByUserId(userId, userDetails);
	}

	public async deleteByUserId(userId: number): Promise<UserInfo> {
		return this.userRepository.deleteByUserId(userId);
	}
}
