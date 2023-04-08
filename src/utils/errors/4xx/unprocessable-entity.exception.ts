import { StatusCodes } from 'http-status-codes';
import HttpError from '@utils/errors/http-error';

class UnprocessableEntityException extends HttpError {
	constructor(message: string) {
		super(StatusCodes.UNPROCESSABLE_ENTITY, message);
		Object.setPrototypeOf(this, UnprocessableEntityException.prototype);
	}
}
export default UnprocessableEntityException;
