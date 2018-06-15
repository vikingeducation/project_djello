import { CLIENT_SET, CLIENT_UNSET } from './constants'

const initialState = {  
			user: {
				_id: 'HyFxJ4eW7'
			},
			token: 'tokenValue'
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