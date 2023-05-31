import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { MetadataKeys } from '@common/constants/metadata';

export const AllowUnauthorizedAccess = (): CustomDecorator<MetadataKeys> =>
	SetMetadata(MetadataKeys.ALLOW_UNAUTHORIZED_ACCESS, true);
