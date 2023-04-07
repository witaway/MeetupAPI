import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class GoneException extends Error {
	status: number;
	name: string;
	constructor(message: string) {
		super(message);
		this.status = StatusCodes.GONE;
		this.name = getReasonPhrase(this.status);
		// Set the prototype explicitly.
		Object.setPrototypeOf(this, GoneException.prototype);
	}
}
export default GoneException;
