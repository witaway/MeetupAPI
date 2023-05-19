import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
			'preventResponseFormatting',
			context.getClass(),
		);
		const preventResponseFormattingOnHandler = this.reflector.get<boolean>(
			'preventResponseFormatting',
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
							'responseMessage',
							context.getHandler(),
						) || '';
					return { statusCode, message, data: data || {} };
				}
			}),
		);
	}
}
