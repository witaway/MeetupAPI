import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common';

import { Response } from 'express';

import { SignUpDto, SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { addTimeToDate } from '@common/utils';
import configuration from '@config/configuration';
import { AllowUnauthorizedAccess, ResponseMessage } from '@common/decorators';
import { Cookies } from '@common/decorators/cookies.decorator';
import { PreventResponseFormatting } from '@common/decorators/prevent-response-auto-format.decorator';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('sign-up')
	@HttpCode(HttpStatus.CREATED)
	@AllowUnauthorizedAccess()
	@ResponseMessage('Signed up successfully')
	public async signUp(@Body() signUpDetails: SignUpDto) {
		return await this.authService.signUp(signUpDetails);
	}

	@Post('sign-in')
	@HttpCode(HttpStatus.OK)
	@AllowUnauthorizedAccess()
	@PreventResponseFormatting()
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
	}

	@Post('sign-out')
	@HttpCode(HttpStatus.NO_CONTENT)
	@PreventResponseFormatting()
	public async signOut(@Res({ passthrough: true }) response: Response) {
		response.clearCookie(configuration.cookie.records.accessToken.name);
		response.clearCookie(configuration.cookie.records.refreshToken.name);
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	@AllowUnauthorizedAccess()
	@PreventResponseFormatting()
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
	}
}
