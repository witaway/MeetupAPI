import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class NotImplementedException extends Error {
	status: number;
	name: string;
	constructor(message: string) {
		super(message);
		this.status = StatusCodes.NOT_IMPLEMENTED;
		this.name = getReasonPhrase(this.status);
		// Set the prototype explicitly.
		Object.setPrototypeOf(this, NotImplementedException.prototype);
	}
}
export default NotImplementedException;
