import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from '@common/utils/crypto';
import { SignInDto, SignUpDto } from './auth.dto';
import { IJwtPayload } from './types';
import { PrismaService } from 'nestjs-prisma';
import configuration from '@config/configuration';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService, private prisma: PrismaService) {}

	public async signUp(signUpDetails: SignUpDto) {
		// Stage 1. Check if such user is already exist
		const existingByEmail = await this.prisma.user.findFirst({
			where: {
				email: signUpDetails.email,
			},
		});

		if (existingByEmail) {
			throw new ConflictException('Email is already taken');
		}

		// Stage 2. Create user entry in database
		const user = await this.prisma.user.create({
			data: signUpDetails,
		});

		return { user };
	}

	public async signIn(
		credentials: Omit<SignInDto, 'stayLoggedIn'>,
		stayLoggedIn: boolean,
	): Promise<{
		accessToken: string;
		refreshToken: string;
	}> {
		const user = await this.prisma.user.findFirst({
			where: {
				email: credentials.email,
			},
			include: {
				roles: true,
			},
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (!compare(credentials.password, user.password)) {
			throw new UnauthorizedException('Password does not match');
		}

		const roles = user.roles.map((role) => role.id);

		const payload: IJwtPayload = {
			id: user.id,
			roles,
			stayLoggedIn,
		};

		const accessToken = this.jwtService.sign(payload, {
			secret: configuration.jwt.accessToken.privateKey,
			expiresIn: configuration.jwt.accessToken.expiration,
		});

		const refreshToken = this.jwtService.sign(payload, {
			secret: configuration.jwt.refreshToken.privateKey,
			expiresIn: stayLoggedIn
				? configuration.jwt.refreshToken.expiration
				: configuration.jwt.refreshToken.expiration,
		});

		return { accessToken, refreshToken };
	}

	public refresh(refreshToken: string) {
		let payload: IJwtPayload;

		try {
			payload = this.jwtService.verify(refreshToken, {
				secret: process.env.REFRESH_TOKEN_SECRET,
			});
		} catch (err: any) {
			if (err.name === 'TokenExpiredError') {
				throw new UnauthorizedException('Refresh token expired');
			}
		}

		const newPayload: IJwtPayload = {
			id: payload!.id,
			roles: payload!.roles,
			stayLoggedIn: payload!.stayLoggedIn,
		};

		const newAccessToken = this.jwtService.sign(newPayload, {
			secret: configuration.jwt.accessToken.privateKey,
			expiresIn: configuration.jwt.accessToken.expiration,
		});
		const newRefreshToken = this.jwtService.sign(newPayload, {
			secret: configuration.jwt.refreshToken.privateKey,
			expiresIn: payload!.stayLoggedIn
				? configuration.jwt.refreshToken.expiration
				: configuration.jwt.refreshToken.expiration,
		});

		return {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			payload: newPayload,
		};
	}
}
