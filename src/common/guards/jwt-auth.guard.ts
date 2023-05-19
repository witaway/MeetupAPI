import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}
	public canActivate(context: ExecutionContext) {
		const allowUnauthorizedRequestForHandler = this.reflector.get<boolean>(
			'allowUnauthorizedRequest',
			context.getHandler(),
		);
		const allowUnauthorizedRequestForClass = this.reflector.get<boolean>(
			'allowUnauthorizedRequest',
			context.getHandler(),
		);
		return (
			allowUnauthorizedRequestForClass ||
			allowUnauthorizedRequestForHandler ||
			super.canActivate(context)
		);
	}
}
