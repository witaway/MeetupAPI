import TagRepository from '@repositories/tag.repository';
import { NotFoundException } from '@utils/errors';
import { TagInfo } from '@dto/tags.dto';

class TagService {
	static async create(tagInfo: TagInfo) {
		return TagRepository.create(tagInfo);
	}

	static async getList() {
		return TagRepository.readList();
	}

	static async getByID(id: number) {
		const user = await TagRepository.readByID(id);
		if (!user) {
			throw new NotFoundException('Tag is not found');
		}
		return user;
	}

	static async updateByID(id: number, tagInfo: Partial<TagInfo>) {
		await TagService.getByID(id);
		return TagRepository.updateByID(id, tagInfo);
	}

	static async deleteByID(id: number) {
		await TagService.getByID(id);
		return TagRepository.deleteByID(id);
	}
}

export default TagService;
