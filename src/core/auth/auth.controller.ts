import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	Res,
} from '@nestjs/common';

import { Response } from 'express';

import { SignUpDto, SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { addTimeToDate } from '@common/utils';
import { AllowUnauthorizedAccess, ResponseMessage } from '@common/decorators';
import { Cookies } from '@common/decorators/cookies.decorator';
import { PreventResponseFormatting } from '@common/decorators/prevent-response-formatting.decorator';
import { CookiesConfig } from '@config/cookies.config';
import { ConfigType } from '@nestjs/config';
import { env } from '@config/env';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		@Inject(CookiesConfig.KEY)
		private cookiesConfig: ConfigType<typeof CookiesConfig>,
	) {}

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

		const accessTokenExpiresIn =
			this.cookiesConfig.records.accessToken.expiration;
		const refreshTokenExpiresIn = signInDto.stayLoggedIn
			? this.cookiesConfig.records.refreshToken.expirationSLI
			: this.cookiesConfig.records.refreshToken.expiration;

		response.cookie(this.cookiesConfig.records.accessToken.name, accessToken, {
			expires: addTimeToDate(new Date(), accessTokenExpiresIn),
		});
		response.cookie(
			this.cookiesConfig.records.refreshToken.name,
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
		response.clearCookie(this.cookiesConfig.records.accessToken.name);
		response.clearCookie(this.cookiesConfig.records.refreshToken.name);
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	@AllowUnauthorizedAccess()
	@PreventResponseFormatting()
	public async refresh(
		@Cookies(env.COOKIE_NAME_REFRESH_TOKEN)
		oldRefreshToken: string,
		@Res({ passthrough: true }) response: Response,
	) {
		const { accessToken, refreshToken, payload } =
			this.authService.refresh(oldRefreshToken);

		const accessTokenExpiresIn =
			this.cookiesConfig.records.accessToken.expiration;
		const refreshTokenExpiresIn = payload.stayLoggedIn
			? this.cookiesConfig.records.refreshToken.expirationSLI
			: this.cookiesConfig.records.refreshToken.expiration;

		response.cookie(this.cookiesConfig.records.accessToken.name, accessToken, {
			expires: addTimeToDate(new Date(), accessTokenExpiresIn),
		});
		response.cookie(
			this.cookiesConfig.records.refreshToken.name,
			refreshToken,
			{
				expires: addTimeToDate(new Date(), refreshTokenExpiresIn),
			},
		);
	}
}
