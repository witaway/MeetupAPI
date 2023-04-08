import { StatusCodes } from 'http-status-codes';
import HttpError from '@utils/errors/http-error';

class NotFoundException extends HttpError {
	constructor(message: string) {
		super(StatusCodes.NOT_FOUND, message);
		Object.setPrototypeOf(this, NotFoundException.prototype);
	}
}
export default NotFoundException;
