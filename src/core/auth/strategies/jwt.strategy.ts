import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';

import { IJwtPayload } from '../types';
import configuration from '@config/configuration';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req) => {
					const token =
						req.cookies[configuration.cookie.records.accessToken.name];
					if (!token) return null;
					else return token;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configuration.jwt.accessToken.privateKey,
		});
	}

	public async validate(payload: IJwtPayload) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: payload.id,
			},
		});
		if (!user) {
			throw new UnauthorizedException(
				'Token has id of removed or non-existent user.',
			);
		}
		return user;
	}
}
