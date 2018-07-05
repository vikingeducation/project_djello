import { USER_SET } from './constants'

export const userSet = function userSet(user) {
	return {
		type: USER_SET,
		user,
	}
}