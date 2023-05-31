import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { MetadataKeys } from '@common/constants/metadata';

export const PreventResponseFormatting = (): CustomDecorator<MetadataKeys> =>
	SetMetadata(MetadataKeys.PREVENT_RESPONSE_FORMATTING, true);
