import { SetMetadata } from '@nestjs/common';
import { MetadataKeys } from '@common/constants/metadata';

export const ResponseMessage = (message: string) =>
	SetMetadata(MetadataKeys.RESPONSE_MESSAGE, message);
