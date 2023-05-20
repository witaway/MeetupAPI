import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetadataKeys } from '@common/constants/metadata';

export interface Response<T> {
	statusCode: number;
	message: string;
	data: T;
}

@Injectable()
export class ResponseFormatInterceptor<T>
	implements NestInterceptor<T, Response<T>>
{
	constructor(private reflector: Reflector) {}

	private isShouldPreventFormatting(context: ExecutionContext) {
		const preventResponseFormattingOnClass = this.reflector.get<boolean>(
			MetadataKeys.PREVENT_RESPONSE_FORMATTING,
			context.getClass(),
		);
		const preventResponseFormattingOnHandler = this.reflector.get<boolean>(
			MetadataKeys.PREVENT_RESPONSE_FORMATTING,
			context.getHandler(),
		);
		return (
			preventResponseFormattingOnClass || preventResponseFormattingOnHandler
		);
	}

	public intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<Response<T>> {
		return next.handle().pipe(
			map((data) => {
				if (this.isShouldPreventFormatting(context)) {
					return data;
				} else {
					const statusCode = context.switchToHttp().getResponse().statusCode;
					const message =
						this.reflector.get<string>(
							MetadataKeys.RESPONSE_MESSAGE,
							context.getHandler(),
						) || '';
					return { statusCode, message, data: data || {} };
				}
			}),
		);
	}
}
