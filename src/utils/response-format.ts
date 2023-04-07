class ResponseFormat {
	static success(statusCode: number, message: string, object: object) {
		return {
			data: object,
			message: message,
			status: 'success',
			statusCode: statusCode,
		};
	}

	static error(statusCode: number, message: number, object: object) {
		return {
			error: object,
			message: message,
			status: 'failed',
			statusCode: statusCode,
		};
	}
}

export default ResponseFormat;
