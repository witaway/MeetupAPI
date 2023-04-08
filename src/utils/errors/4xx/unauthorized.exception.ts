import { StatusCodes } from 'http-status-codes';
import HttpError from '@utils/errors/http-error';

class UnauthorizedException extends HttpError {
	constructor(message: string) {
		super(StatusCodes.UNAUTHORIZED, message);
		Object.setPrototypeOf(this, UnauthorizedException.prototype);
	}
}
export default UnauthorizedException;
