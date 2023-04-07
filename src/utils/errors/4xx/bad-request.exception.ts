import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class BadRequestException extends Error {
	status: number;
	name: string;
	constructor(message: string) {
		super(message);
		this.status = StatusCodes.BAD_REQUEST;
		this.name = getReasonPhrase(this.status);
		// Set the prototype explicitly.
		Object.setPrototypeOf(this, BadRequestException.prototype);
	}
}
export default BadRequestException;
