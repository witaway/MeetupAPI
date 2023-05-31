import { hashSync, compareSync } from 'bcrypt';

export function hash(text: any): string {
	return hashSync(text, 10);
}

export function compare(data: any, encrypted: string): boolean {
	return compareSync(data, encrypted);
}
