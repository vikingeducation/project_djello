import { CLIENT_SET, CLIENT_UNSET } from './constants'

export function setClient({ token, user}) {
	return {
		type: CLIENT_SET,
		token,
		user
	}
}

export function unsetClient() {
	return {
		type: CLIENT_UNSET,
	}
}

