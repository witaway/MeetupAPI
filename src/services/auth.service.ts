import AuthRepository from '@repositories/auth.repository';
import UserRepository from '@repositories/user.repository';
import { UnauthorizedException } from '@utils/errors';
import { compareHash } from '@utils/crypto';

class AuthService {
	static async loginWithEmailAndPassword(email: string, password: string) {
		const userWithGivenEmail = await UserRepository.getByEmail(email, true);
		if (!userWithGivenEmail) {
			throw new UnauthorizedException('User with this email was not found');
		}
		const matchingResult = compareHash(password, userWithGivenEmail.password);
		if (!matchingResult) {
			throw new UnauthorizedException('The entered password does not match');
		}
		return AuthRepository.loginById(userWithGivenEmail.id);
	}
}

export default AuthService;
