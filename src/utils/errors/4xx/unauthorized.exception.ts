import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class UnauthorizedException extends Error {
	status: number;
	name: string;
	constructor(message: string) {
		super(message);
		this.status = StatusCodes.UNAUTHORIZED;
		this.name = getReasonPhrase(this.status);
		// Set the prototype explicitly.
		Object.setPrototypeOf(this, UnauthorizedException.prototype);
	}
}
export default UnauthorizedException;
