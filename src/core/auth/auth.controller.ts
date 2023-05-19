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
import { addTimeToDate } from '@common/utils';
import configuration from '@config/configuration';
import { AllowUnauthorizedAccess } from '@common/decorators';
import { Cookies } from '@common/decorators/cookies.decorator';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@AllowUnauthorizedAccess()
	@Post('sign-up')
	@HttpCode(HttpStatus.CREATED)
	public async signUp(@Body() signUpDetails: SignUpDto) {
		return await this.authService.signUp(signUpDetails);
	}

	@AllowUnauthorizedAccess()
	@Post('sign-in')
	@HttpCode(HttpStatus.OK)
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

		return {};
	}

	@Post('sign-out')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async signOut(@Res({ passthrough: true }) response: Response) {
		response.clearCookie(configuration.cookie.records.accessToken.name);
		response.clearCookie(configuration.cookie.records.refreshToken.name);
		return {};
	}

	@AllowUnauthorizedAccess()
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	public async refresh(
		@Cookies(configuration.cookie.records.refreshToken.name)
		oldRefreshToken: string,
		@Res({ passthrough: true }) response: Response,
	) {
		const { accessToken, refreshToken, payload } =
			this.authService.refresh(oldRefreshToken);

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

		return {};
	}
}
