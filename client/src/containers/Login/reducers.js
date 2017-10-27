import * as Events from '../../socket/events';
const { REDUCERS, CLIENT, INTERNAL } = Events;

const initialListsState = {
	lists: null,
	isWorking: false,
	error: null
};

export default (state = initialListsState, action) => {
	console.log(action.type);
	switch (action.type) {
		case CLIENT.ATTEMPT_LOGIN:
			return {
				...state,
				isWorking: true,
				error: null
			};
		case CLIENT.ATTEMPT_LOGOUT:
			return {
				...state,
				isWorking: true,
				error: null
			};
		case CLIENT.SUCCESS_LOGIN:
			//console.log('Success', action.data);
			return {
				...state,
				user: action.data,
				isWorking: false
			};
		case CLIENT.SUCCESS_LOGOUT:
			//console.log('Success', action.data);
			return {
				...state,
				user: null,
				isWorking: false
			};
		case CLIENT.FAILURE_LOGIN:
		case CLIENT.FAILURE_LOGOUT:
			console.log('Error: ', action.err);
			return {
				...state,
				error: action.err,
				isWorking: false
			};
		case INTERNAL.CLEAR_ERROR:
			console.log(action);
			if (action.reducer === REDUCERS.LOGIN) {
				return {
					...state,
					error: null
				};
			}
			return state;
		default:
			return state;
	}
};
