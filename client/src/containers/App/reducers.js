import * as Actions from './actions';
const { SYSTEM, CLIENT } = Actions.default;

const initialRegisterState = {
	success: false,
	isWorking: false,
	error: null
};

export const RegisterReducer = (state = initialRegisterState, action) => {
	switch (action.type) {
		case SYSTEM.ATTEMPT_REGISTER:
			return {
				...state,
				isWorking: true,
				error: null
			};
		case SYSTEM.SUCCESS_REGISTER:
			return {
				...state,
				success: true,
				isWorking: false
			};
		case SYSTEM.FAILURE_REGISTER:
			console.log('Error: ', action.error);
			return {
				success: false,
				error: action.error,
				isWorking: false
			};
		default:
			return state;
	}
};

const initialLoginState = {
	user: null,
	isWorking: false,
	error: null
};

export const LoginReducer = (state = initialLoginState, action) => {
	switch (action.type) {
		case SYSTEM.ATTEMPT_REGISTER:
			return {
				...state,
				isWorking: true,
				error: null
			};
		case SYSTEM.SUCCESS_REGISTER:
			return {
				...state,
				user: action.data,
				isWorking: false
			};
		case SYSTEM.FAILURE_REGISTER:
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
