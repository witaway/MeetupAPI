import { SetMetadata } from '@nestjs/common';
import { MetadataKeys } from '@common/constants/metadata';

export const AllowUnauthorizedAccess = () =>
	SetMetadata(MetadataKeys.ALLOW_UNAUTHORIZED_ACCESS, true);
