import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { MetadataKeys } from '@common/constants/metadata';

export const ResponseMessage = (
	message: string,
): CustomDecorator<MetadataKeys> =>
	SetMetadata(MetadataKeys.RESPONSE_MESSAGE, message);
