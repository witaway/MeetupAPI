export interface JwtPayload {
	id: number;
	roles: Array<number>;
	stayLoggedIn: boolean;
}
