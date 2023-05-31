import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { MetadataKeys } from '@common/constants/metadata';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}
	public canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const allowUnauthorizedAccessForHandler = this.reflector.get<boolean>(
			MetadataKeys.ALLOW_UNAUTHORIZED_ACCESS,
			context.getHandler(),
		);

		const allowUnauthorizedAccessForClass = this.reflector.get<boolean>(
			MetadataKeys.ALLOW_UNAUTHORIZED_ACCESS,
			context.getHandler(),
		);
		return (
			allowUnauthorizedAccessForClass ||
			allowUnauthorizedAccessForHandler ||
			super.canActivate(context)
		);
	}
}
