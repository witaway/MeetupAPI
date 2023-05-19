import { Prisma } from '@prisma/client';
import { hash } from '@common/utils';

export const hashPasswordsMiddleware: Prisma.Middleware = <T>(
	params: Prisma.MiddlewareParams,
	next: (params: Prisma.MiddlewareParams) => Promise<T>,
): Promise<T> => {
	if (params.model === 'User') {
		if (params.action === 'create' || params.action === 'update') {
			const user = params.args.data;
			user.password = hash(user.password);
			params.args.data = user;
		} else if (
			params.action === 'createMany' ||
			params.action === 'updateMany'
		) {
			const users = params.args.data;
			for (const user of params.args.data) {
				user.password = hash(user.password);
			}
			params.args.data = users;
		}
	}
	return next(params);
};
