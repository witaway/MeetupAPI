import { Request, ParamsDictionary } from 'express-serve-static-core';
import { ZodType, ZodTypeDef, z } from 'zod';
import { Schemas } from './schemas';

export declare type TypedRequest<TSchemas extends Schemas> = Request<
	TSchemas['params'] extends ZodType<any, ZodTypeDef, any>
		? z.infer<TSchemas['params']>
		: ParamsDictionary,
	string,
	TSchemas['body'] extends ZodType<any, ZodTypeDef, any>
		? z.infer<TSchemas['body']>
		: any,
	TSchemas['query'] extends ZodType<any, ZodTypeDef, any>
		? z.infer<TSchemas['query']>
		: any
>;
