import jwt from 'jsonwebtoken';
import env from '@config/env';

class AuthRepository {
	static async loginById(userId: number) {
		return jwt.sign(
			{
				id: userId,
			},
			env.JWT_PRIVATE_KEY,
			{
				expiresIn: 60 * 60,
			},
		);
	}
}

export default AuthRepository;
