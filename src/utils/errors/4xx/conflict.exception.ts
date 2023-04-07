import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class ConflictException extends Error {
	status: number;
	name: string;
	constructor(message: string) {
		super(message);
		this.status = StatusCodes.CONFLICT;
		this.name = getReasonPhrase(this.status);
		// Set the prototype explicitly.
		Object.setPrototypeOf(this, ConflictException.prototype);
	}
}
export default ConflictException;
