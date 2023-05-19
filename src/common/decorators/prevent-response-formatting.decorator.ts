import { SetMetadata } from '@nestjs/common';

export const PreventResponseFormatting = () =>
	SetMetadata('preventResponseFormatting', true);
