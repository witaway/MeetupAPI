import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class InternalServerError extends Error {
	status: number;
	name: string;
	constructor(message: string) {
		super(message);
		this.status = StatusCodes.INTERNAL_SERVER_ERROR;
		this.name = getReasonPhrase(this.status);
		// Set the prototype explicitly.
		Object.setPrototypeOf(this, InternalServerError.prototype);
	}
}
export default InternalServerError;
