import { StatusCodes } from 'http-status-codes';
import HttpError from '@utils/errors/http-error';

class ConflictException extends HttpError {
	constructor(message: string) {
		super(StatusCodes.CONFLICT, message);
		Object.setPrototypeOf(this, ConflictException.prototype);
	}
}
export default ConflictException;
