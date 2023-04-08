import { StatusCodes } from 'http-status-codes';
import HttpError from '@utils/errors/http-error';

class ForbiddenException extends HttpError {
	constructor(message: string) {
		super(StatusCodes.FORBIDDEN, message);
		Object.setPrototypeOf(this, ForbiddenException.prototype);
	}
}
export default ForbiddenException;
