import { CLIENT_SET, CLIENT_UNSET } from './constants'

const initialState = {  
  user: null,
  token: null,
}

const reducer = function clientReducer(state = initialState, action) {
	switch(action.type) {
		case CLIENT_SET:
			return {
				user: action.user,
				token: action.token,
			}
		case CLIENT_UNSET:
			return {
				user: null,
				token: null,
			}
		default:
			return state
	}
}

export default reducer