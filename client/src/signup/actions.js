import { SIGNUP_REQUESTING } from './constants';

const signupRequest = function signupRequest({ email, password, firstName, lastName }) {
	return {
		type: SIGNUP_REQUESTING,
		email,
		password,
		firstName,
		lastName
	}
}

export default signupRequest