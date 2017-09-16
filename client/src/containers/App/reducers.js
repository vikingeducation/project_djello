import * as Actions from './actions';
const { REDUCERS, CLIENT, INTERNAL } = Actions.default;

const initialLoginState = {
	user: null,
	isWorking: false,
	error: null
};

export const LoginReducer = (state = initialLoginState, action) => {
	console.log(action.type);
	switch (action.type) {
		case CLIENT.ATTEMPT_LOGIN:
			return {
				...state,
				isWorking: true,
				error: null
			};
		case CLIENT.SUCCESS_LOGIN:
			return {
				...state,
				user: action.data,
				isWorking: false
			};
		case CLIENT.FAILURE_LOGIN:
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
