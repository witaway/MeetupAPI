import { Prisma } from '@prisma/client';

export const selectOwnerShortInfo = Prisma.validator<Prisma.UserArgs>()({
	select: {
		id: true,
		name: true,
	},
});
export type OwnerShortInfo = Prisma.UserGetPayload<typeof selectOwnerShortInfo>;

export const selectMeetupShortInfo = Prisma.validator<Prisma.MeetupArgs>()({
	select: {
		id: true,
		theme: true,
		time: true,
	},
});
export type MeetupShortInfo = Prisma.UserGetPayload<
	typeof selectMeetupShortInfo
>;

export const selectMeetupShortInfoWithRelated =
	Prisma.validator<Prisma.MeetupArgs>()({
		select: {
			id: true,
			theme: true,
			time: true,
			owner: {
				select: {
					id: true,
					name: true,
				},
			},
			tags: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
export type MeetupShortInfoWithRelated = Prisma.MeetupGetPayload<
	typeof selectMeetupShortInfoWithRelated
>;

export const selectMeetupInfo = Prisma.validator<Prisma.MeetupArgs>()({
	select: {
		id: true,
		time: true,
		place: true,
		theme: true,
		description: true,
	},
});
export type MeetupInfo = Prisma.MeetupGetPayload<typeof selectMeetupInfo>;

export const selectMeetupInfoWithRelated =
	Prisma.validator<Prisma.MeetupArgs>()({
		select: {
			id: true,
			time: true,
			place: true,
			theme: true,
			description: true,
			owner: {
				select: {
					id: true,
					name: true,
				},
			},
			tags: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
export type MeetupInfoWithRelated = Prisma.MeetupGetPayload<
	typeof selectMeetupInfoWithRelated
>;
