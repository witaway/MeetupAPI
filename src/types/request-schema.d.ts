import { ZodType, ZodTypeDef } from 'zod';

export type RequestSchema = {
	params?: ZodType<any, ZodTypeDef, any>;
	query?: ZodType<any, ZodTypeDef, any>;
	body?: ZodType<any, ZodTypeDef, any>;
};
