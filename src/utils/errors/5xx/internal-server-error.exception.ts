import { StatusCodes } from 'http-status-codes';
import HttpError from '@utils/errors/http-error';

class InternalServerError extends HttpError {
	constructor(message: string) {
		super(StatusCodes.INTERNAL_SERVER_ERROR, message);
		Object.setPrototypeOf(this, InternalServerError.prototype);
	}
}
export default InternalServerError;
