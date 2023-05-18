export interface IJwtPayload {
	id: number;
	roles: Array<number>;
	stayLoggedIn: boolean;
}
