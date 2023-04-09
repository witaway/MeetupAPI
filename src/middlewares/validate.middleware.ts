import { RequestHandler } from 'express';
import { ZodError, ZodSchema } from 'zod';
import ResponseFormat from '@utils/response-format';

type RequestValidation<TParams, TQuery, TBody> = {
	params?: ZodSchema<TParams>;
	query?: ZodSchema<TQuery>;
	body?: ZodSchema<TBody>;
};

type ErrorListItem = {
	type: 'Query' | 'Params' | 'Body';
	errors: ZodError<any>;
};

const validate = function <TParams = any, TQuery = any, TBody = any>(
	schemas: RequestValidation<TParams, TQuery, TBody>,
): RequestHandler<TParams, any, TBody, TQuery> {
	const { params, query, body } = schemas;
	return (req, res, next) => {
		const errors: Array<ErrorListItem> = [];
		if (params) {
			const parsed = params.safeParse(req.params);
			if (!parsed.success) {
				errors.push({ type: 'Params', errors: parsed.error });
			} else {
				req.params = parsed.data;
			}
		}
		if (query) {
			const parsed = query.safeParse(req.query);
			if (!parsed.success) {
				errors.push({ type: 'Query', errors: parsed.error });
			} else {
				req.query = parsed.data;
			}
		}
		if (body) {
			const parsed = body.safeParse(req.body);
			if (!parsed.success) {
				errors.push({ type: 'Body', errors: parsed.error });
			} else {
				req.body = parsed.data;
			}
		}
		if (errors.length > 0) {
			return res
				.status(400)
				.send(
					ResponseFormat.error(
						400,
						'The request has the incorrect format',
						errors,
					),
				);
		}
		return next();
	};
};

export default validate;
