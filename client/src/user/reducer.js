import { USER_SET } from './constants';

const reducer = function(state = {}, action) {

	switch(action.type) {
		
		case USER_SET:
			return {
				...action.user
			}
		default:
			return state
	}
}

export default reducer;
