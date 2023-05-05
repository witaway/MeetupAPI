/**
 * Returns a new Date object with added time based on the input string, relative to a given date.
 * @param date The Date object to add time to.
 * @param time A string representing the time to add in the format "{number}{unit}", where {number} is a positive integer and {unit} is one of "ms" (milliseconds), "s" (seconds), "m" (minutes), "h" (hours), "d" (days), "w" (weeks), "M" (months), or "y" (years).
 * @returns A new Date object with the added time.
 * @throws An error if the input time string is invalid.
 */
export const addTimeToDate = function (date: Date, time: string): Date {
	const match = /^(\d+)(ms|s|m|h|d|w|M|y)$/.exec(time);

	if (!match) {
		throw new Error(`Invalid time string: ${time}`);
	}

	const multiplier = parseInt(match[1], 10);

	if (isNaN(multiplier)) {
		throw new Error(`Invalid multiplier: ${match[1]}`);
	}

	const unit = match[2];

	switch (unit) {
		case 'ms':
			return new Date(date.getTime() + multiplier);
		case 's':
			return new Date(date.getTime() + multiplier * 1000);
		case 'm':
			return new Date(date.getTime() + multiplier * 60000);
		case 'h':
			return new Date(date.getTime() + multiplier * 3600000);
		case 'd':
			return new Date(date.getTime() + multiplier * 86400000);
		case 'w':
			return new Date(date.getTime() + multiplier * 604800000);
		case 'M':
			const nextMonth = new Date(date.getTime());
			nextMonth.setMonth(date.getMonth() + multiplier);
			return nextMonth;
		case 'y':
			const nextYear = new Date(date.getTime());
			nextYear.setFullYear(date.getFullYear() + multiplier);
			return nextYear;
		default:
			throw new Error(`Invalid time unit: ${unit}`);
	}
};
