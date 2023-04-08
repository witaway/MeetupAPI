import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class HttpError extends Error {
	status: number;
	name: string;
	constructor(status: StatusCodes | number, message: string) {
		super(message);
		this.status = status;
		this.name = getReasonPhrase(this.status);
		Object.setPrototypeOf(this, HttpError.prototype);
	}
}
export default HttpError;
