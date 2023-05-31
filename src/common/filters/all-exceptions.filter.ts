import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { logger } from '@common/utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	public catch(exception: Error, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		if (exception instanceof HttpException) {
			response.status(status).json(exception.getResponse());
			return;
		}

		logger.error(exception, 'Internal server error');

		response.status(status).json({
			statusCode: status,
			message: 'We got an error in processing this request',
			error: 'Internal server error',
		});
	}
}
