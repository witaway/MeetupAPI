import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class NotFoundException extends Error {
	status: number;
	name: string;
	constructor(message: string) {
		super(message);
		this.status = StatusCodes.NOT_FOUND;
		this.name = getReasonPhrase(this.status);
		// Set the prototype explicitly.
		Object.setPrototypeOf(this, NotFoundException.prototype);
	}
}
export default NotFoundException;
