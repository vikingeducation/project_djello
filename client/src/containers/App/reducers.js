import * as Actions from './actions';
const { CLIENT } = Actions.default;

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
			console.log('USER', action.data);
			return {
				...state,
				user: action.data,
				isWorking: false
			};
		case CLIENT.FAILURE_LOGIN:
			console.log('Error: ', action.error);
			return {
				...state,
				error: action.error,
				isWorking: false
			};
		default:
			return state;
	}
};
