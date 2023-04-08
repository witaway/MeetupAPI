import { StatusCodes } from 'http-status-codes';
import HttpError from '@utils/errors/http-error';

class BadRequestException extends HttpError {
	constructor(message: string) {
		super(StatusCodes.BAD_REQUEST, message);
		Object.setPrototypeOf(this, BadRequestException.prototype);
	}
}
export default BadRequestException;
