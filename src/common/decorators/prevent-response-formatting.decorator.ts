import { SetMetadata } from '@nestjs/common';
import { MetadataKeys } from '@common/constants/metadata';

export const PreventResponseFormatting = () =>
	SetMetadata(MetadataKeys.PREVENT_RESPONSE_FORMATTING, true);
