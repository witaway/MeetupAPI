import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
	(name: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return name ? request.cookies?.[name] : request.cookies;
	},
);
