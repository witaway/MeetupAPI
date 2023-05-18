import { hashSync, compareSync } from 'bcrypt';

export function hash(text: any) {
	return hashSync(text, 10);
}

export function compare(data: any, encrypted: string) {
	return compareSync(data, encrypted);
}
