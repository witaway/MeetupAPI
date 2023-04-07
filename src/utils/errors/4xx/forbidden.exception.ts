import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class ForbiddenException extends Error {
	status: number;
	name: string;
	constructor(message: string) {
		super(message);
		this.status = StatusCodes.FORBIDDEN;
		this.name = getReasonPhrase(this.status);
		// Set the prototype explicitly.
		Object.setPrototypeOf(this, ForbiddenException.prototype);
	}
}
export default ForbiddenException;
