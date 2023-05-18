import { SetMetadata } from '@nestjs/common';

export const AllowUnauthorizedAccess = () =>
	SetMetadata('allowUnauthorizedRequest', true);
