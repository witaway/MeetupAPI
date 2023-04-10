import { RequestSchema } from '@customTypes/request-schema';
import {
	loginCredentials,
	registerCredentials,
} from '@dto/definitions/auth.dto';

export default class AuthSchemas {
	static login = {
		body: loginCredentials.strict(),
	} as const satisfies RequestSchema;

	static register = {
		body: registerCredentials.strict(),
	} as const satisfies RequestSchema;

	static logout = {} as const satisfies RequestSchema;
}
