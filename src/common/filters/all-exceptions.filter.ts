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
	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		if (exception instanceof HttpException) {
			return response.status(status).json(exception.getResponse());
		}

		logger.error(exception, 'Internal server error');

		response.status(status).json({
			statusCode: status,
			message: 'We got an error in processing this request',
			error: 'Internal server error',
		});
	}
}
