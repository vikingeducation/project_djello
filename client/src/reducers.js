import { SET_USER, SET_BOARDS, ADD_BOARD, REMOVE_BOARD } from "./actions";

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
		case ADD_BOARD:
			return {
				...state,
				boards: [action.data, ...state.boards]
			};
		case REMOVE_BOARD:
			return {
				...state,
				boards: state.boards.filter(board => board.id !== action.data)
			};
		default:
			return state;
	}
};
