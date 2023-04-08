import { StatusCodes } from 'http-status-codes';
import HttpError from '@utils/errors/http-error';

class GoneException extends HttpError {
	constructor(message: string) {
		super(StatusCodes.GONE, message);
		Object.setPrototypeOf(this, GoneException.prototype);
	}
}
export default GoneException;
