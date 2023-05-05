import ResponseFormat from '@utils/response-format';
import { Request, Response, NextFunction } from 'express';
import HttpError from '@utils/errors/http-error';
import logger from '@utils/logger';

const errorsHandler = async (
	err: Error,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) => {
	//If it's expected exception with defined http code
	if (err instanceof HttpError) {
		res.status(err.status).json(
			ResponseFormat.error(err.status, 'Request failed', {
				name: err.name,
				message: err.message,
			}),
		);
	}
	//Or if it's totally unexpected and everything is BAD
	else {
		logger.error(err, 'Internal server error');
		res
			.status(500)
			.json(ResponseFormat.error(500, 'Internal Server Error', {}));
	}
};

export default errorsHandler;
