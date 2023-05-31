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
import { EmptyResponse } from '@common/types/empty-response';
import { UserInfo } from '@core/user/types';

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
	public async signUp(@Body() signUpDetails: SignUpDto): Promise<UserInfo> {
		const user = await this.authService.signUp(signUpDetails);
		return {
			id: user.id,
			name: user.name,
			email: user.email,
		};
	}

	@Post('sign-in')
	@HttpCode(HttpStatus.OK)
	@AllowUnauthorizedAccess()
	@PreventResponseFormatting()
	public async signIn(
		@Body() signInDto: SignInDto,
		@Res({ passthrough: true }) response: Response,
	): Promise<EmptyResponse> {
		const { accessToken, refreshToken } = await this.authService.signIn(
			{
				email: signInDto.email,
				password: signInDto.password,
			},
			signInDto.stayLoggedIn,
		);

		const stayLoggedIn = signInDto.stayLoggedIn;
		await this.sendAccessTokenCookie(response, accessToken);
		await this.sendRefreshTokenCookie(response, refreshToken, stayLoggedIn);

		return {};
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	@AllowUnauthorizedAccess()
	@PreventResponseFormatting()
	public async refresh(
		@Cookies(env.COOKIE_NAME_REFRESH_TOKEN)
		oldRefreshToken: string,
		@Res({ passthrough: true }) response: Response,
	): Promise<EmptyResponse> {
		const { accessToken, refreshToken, payload } =
			await this.authService.refresh(oldRefreshToken);

		const stayLoggedIn = payload.stayLoggedIn;
		await this.sendAccessTokenCookie(response, accessToken);
		await this.sendRefreshTokenCookie(response, refreshToken, stayLoggedIn);

		return {};
	}

	@Post('sign-out')
	@HttpCode(HttpStatus.NO_CONTENT)
	@PreventResponseFormatting()
	public async signOut(
		@Res({ passthrough: true }) response: Response,
	): Promise<EmptyResponse> {
		response.clearCookie(this.cookiesConfig.records.accessToken.name);
		response.clearCookie(this.cookiesConfig.records.refreshToken.name);
		return {};
	}

	public async sendAccessTokenCookie(
		response: Response,
		accessToken: string,
	): Promise<void> {
		const accessTokenName = this.cookiesConfig.records.accessToken.name;
		const accessTokenExpiresIn = addTimeToDate(
			new Date(),
			this.cookiesConfig.records.accessToken.expiration,
		);
		response.cookie(accessTokenName, accessToken, {
			expires: accessTokenExpiresIn,
		});
	}

	public async sendRefreshTokenCookie(
		response: Response,
		refreshToken: string,
		stayLoggedIn: boolean,
	): Promise<void> {
		const refreshTokenName = this.cookiesConfig.records.refreshToken.name;
		const refreshTokenExpiresIn = addTimeToDate(
			new Date(),
			stayLoggedIn
				? this.cookiesConfig.records.refreshToken.expirationSLI
				: this.cookiesConfig.records.refreshToken.expiration,
		);
		response.cookie(refreshTokenName, refreshToken, {
			expires: refreshTokenExpiresIn,
		});
	}
}
