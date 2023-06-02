import { Prisma } from '@prisma/client';

export const selectUserInfo = Prisma.validator<Prisma.UserArgs>()({
	select: {
		id: true,
		name: true,
		email: true,
	},
});
export type UserInfo = Prisma.UserGetPayload<typeof selectUserInfo>;
