import { StatusCodes } from 'http-status-codes';
import HttpError from '@utils/errors/http-error';

class NotImplementedException extends HttpError {
	constructor(message: string) {
		super(StatusCodes.NOT_IMPLEMENTED, message);
		Object.setPrototypeOf(this, NotImplementedException.prototype);
	}
}
export default NotImplementedException;
