import ResponseFormat from '@utils/response-format';
import { Request, Response } from 'express-serve-static-core';

const notFoundHandler = (req: Request, res: Response) => {
	res
		.status(404)
		.send(ResponseFormat.error(404, 'The endpoint does not exist', {}));
};

export default notFoundHandler;
