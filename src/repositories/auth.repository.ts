import jwt from 'jsonwebtoken';
import config from '@utils/config';

class AuthRepository {
	static async loginById(userId: number) {
		const privateKey = config.jwt.accessToken.privateKey;
		const expiration = config.jwt.accessToken.expiration;
		return jwt.sign(
			{
				id: userId,
			},
			privateKey,
			{
				expiresIn: expiration,
			},
		);
	}
}

export default AuthRepository;
