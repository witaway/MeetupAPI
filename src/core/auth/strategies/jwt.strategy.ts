import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from '../types';
import { PrismaService } from 'nestjs-prisma';
import { CookiesConfig } from '@config/cookies.config';
import { ConfigType } from '@nestjs/config';
import { JwtConfig } from '@config/jwt.config';
import { Role, User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private prisma: PrismaService,
		@Inject(CookiesConfig.KEY) cookiesConfig: ConfigType<typeof CookiesConfig>,
		@Inject(JwtConfig.KEY) jwtConfig: ConfigType<typeof JwtConfig>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req) => {
					const token = req.cookies[cookiesConfig.records.accessToken.name];
					if (!token) return null;
					else return token;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: jwtConfig.accessToken.privateKey,
		});
	}

	public async validate(
		payload: JwtPayload,
	): Promise<User & { roles: Role[] }> {
		const user = await this.prisma.user.findUnique({
			where: {
				id: payload.id,
			},
			include: {
				roles: true,
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
