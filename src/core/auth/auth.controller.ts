import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common';

import { Response } from 'express';

import { SignUpDto, SignInDto, RefreshDto } from './auth.dto';
import { AuthService } from './auth.service';
import { PrismaService } from 'nestjs-prisma';
import { addTimeToDate } from '../../common/utils/add-time-to-date';
import configuration from '@config/configuration';
import { AllowUnauthorizedAccess } from '../../common/decorators/allow-unauthorized-access.decorator';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private prisma: PrismaService,
	) {}

	@Post('sign-up')
	@HttpCode(HttpStatus.CREATED)
	@AllowUnauthorizedAccess()
	public async signUp(@Body() signUpInfo: SignUpDto) {
		return await this.authService.signUp(signUpInfo);
	}

	@Post('sign-in')
	@AllowUnauthorizedAccess()
	public async signIn(
		@Body() signInDto: SignInDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const { accessToken, refreshToken } = await this.authService.signIn(
			{
				email: signInDto.email,
				password: signInDto.password,
			},
			signInDto.stayLoggedIn,
		);

		const accessTokenExpiresIn = configuration.jwt.accessToken.expiration;
		const refreshTokenExpiresIn = signInDto.stayLoggedIn
			? configuration.jwt.refreshToken.expirationSLI
			: configuration.jwt.refreshToken.expiration;

		response.cookie(
			configuration.cookie.records.accessToken.name,
			accessToken,
			{
				expires: addTimeToDate(new Date(), accessTokenExpiresIn),
			},
		);
		response.cookie(
			configuration.cookie.records.refreshToken.name,
			refreshToken,
			{
				expires: addTimeToDate(new Date(), refreshTokenExpiresIn),
			},
		);

		return {
			accessToken,
			refreshToken,
		};
	}

	@Post('sign-out')
	public async signOut(@Res({ passthrough: true }) response: Response) {
		response.clearCookie(configuration.cookie.records.accessToken.name);
		response.clearCookie(configuration.cookie.records.refreshToken.name);
	}

	@Post('refresh')
	@AllowUnauthorizedAccess()
	public async refresh(
		@Body() refreshDto: RefreshDto,
		@Res({ passthrough: true }) response: Response,
	) {
		const { accessToken, refreshToken, payload } = this.authService.refresh(
			refreshDto.refreshToken,
		);

		const accessTokenExpiresIn = configuration.jwt.accessToken.expiration;
		const refreshTokenExpiresIn = payload.stayLoggedIn
			? configuration.jwt.refreshToken.expirationSLI
			: configuration.jwt.refreshToken.expiration;

		response.cookie(
			configuration.cookie.records.accessToken.name,
			accessToken,
			{
				expires: addTimeToDate(new Date(), accessTokenExpiresIn),
			},
		);
		response.cookie(
			configuration.cookie.records.refreshToken.name,
			refreshToken,
			{
				expires: addTimeToDate(new Date(), refreshTokenExpiresIn),
			},
		);

		return {
			accessToken,
			refreshToken,
		};
	}
}
