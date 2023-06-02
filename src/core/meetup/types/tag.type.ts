import { Prisma } from '@prisma/client';

export const selectTagInfo = Prisma.validator<Prisma.TagArgs>()({
	select: {
		id: true,
		name: true,
	},
});
export type TagInfo = Prisma.TagGetPayload<typeof selectTagInfo>;
