import { BadRequestException, Param, ParseIntPipe } from '@nestjs/common';

export const IntParam = (property: string): ParameterDecorator =>
	Param(
		property,
		new ParseIntPipe({
			exceptionFactory: () =>
				new BadRequestException(`Parameter ${property} must be integer number`),
		}),
	);
