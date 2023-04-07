import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class UnprocessableEntityException extends Error {
	status: number;
	name: string;
	constructor(message: string) {
		super(message);
		this.status = StatusCodes.UNPROCESSABLE_ENTITY;
		this.name = getReasonPhrase(this.status);
		// Set the prototype explicitly.
		Object.setPrototypeOf(this, UnprocessableEntityException.prototype);
	}
}
export default UnprocessableEntityException;
