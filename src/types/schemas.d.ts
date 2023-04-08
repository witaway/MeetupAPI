import { ZodType, ZodTypeDef } from 'zod';

export declare type Schemas = {
	params?: ZodType<any, ZodTypeDef, any>;
	query?: ZodType<any, ZodTypeDef, any>;
	body?: ZodType<any, ZodTypeDef, any>;
};
