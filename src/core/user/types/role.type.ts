import { Prisma } from '@prisma/client';

export const selectRoleInfo = Prisma.validator<Prisma.RoleArgs>()({
	select: {
		id: true,
		name: true,
	},
});
export type RoleInfo = Prisma.RoleGetPayload<typeof selectRoleInfo>;
