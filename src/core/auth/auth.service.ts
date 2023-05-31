import {
	ConflictException,
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { compare } from '@common/utils/crypto';
import { SignInDto, SignUpDto } from './auth.dto';
import { JwtPayload } from './types';
import { PrismaService } from 'nestjs-prisma';
import { ConfigType } from '@nestjs/config';
import { JwtConfig } from '@config/jwt.config';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private prisma: PrismaService,
		@Inject(JwtConfig.KEY) private jwtConfig: ConfigType<typeof JwtConfig>,
	) {}

	public async signUp(signUpDetails: SignUpDto): Promise<User> {
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

		return user;
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

		const payload: JwtPayload = {
			id: user.id,
			roles,
			stayLoggedIn,
		};

		const accessToken = this.jwtService.sign(payload, {
			secret: this.jwtConfig.accessToken.privateKey,
			expiresIn: this.jwtConfig.accessToken.expiration,
		});

		const refreshToken = this.jwtService.sign(payload, {
			secret: this.jwtConfig.refreshToken.privateKey,
			expiresIn: stayLoggedIn
				? this.jwtConfig.refreshToken.expiration
				: this.jwtConfig.refreshToken.expirationSLI,
		});

		return { accessToken, refreshToken };
	}

	public async refresh(refreshToken: string): Promise<{
		accessToken: string;
		refreshToken: string;
		payload: JwtPayload;
	}> {
		let payload: JwtPayload;

		try {
			payload = this.jwtService.verify(refreshToken, {
				secret: this.jwtConfig.refreshToken.privateKey,
			});
		} catch (err: any) {
			if (err.name === 'TokenExpiredError') {
				throw new UnauthorizedException('Refresh token expired');
			}
		}

		const newPayload: JwtPayload = {
			id: payload!.id,
			roles: payload!.roles,
			stayLoggedIn: payload!.stayLoggedIn,
		};

		const newAccessToken = this.jwtService.sign(newPayload, {
			secret: this.jwtConfig.accessToken.privateKey,
			expiresIn: this.jwtConfig.accessToken.expiration,
		});
		const newRefreshToken = this.jwtService.sign(newPayload, {
			secret: this.jwtConfig.refreshToken.privateKey,
			expiresIn: payload!.stayLoggedIn
				? this.jwtConfig.refreshToken.expiration
				: this.jwtConfig.refreshToken.expirationSLI,
		});

		return {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			payload: newPayload,
		};
	}
}
