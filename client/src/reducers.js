import { SET_USER, SET_BOARDS } from "./actions";

export const djelloApp = (state = { user: {}, boards: [] }, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.data
			};
		case SET_BOARDS:
			return {
				...state,
				boards: action.data
			};
		default:
			return state;
	}
};
