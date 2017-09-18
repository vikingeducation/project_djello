import {
	SET_USER,
	SET_BOARDS,
	ADD_BOARD,
	REMOVE_BOARD,
	ADD_LIST,
	REMOVE_LIST
} from "./actions";

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
		case ADD_LIST:
			return {
				...state,
				boards: state.boards.map(board => {
					return board.id === action.data.boardId
						? { ...board, Lists: [...board.Lists, action.data.list] }
						: board;
				})
			};
		case REMOVE_LIST:
			return {
				...state,
				boards: state.boards.map(board => {
					board.Lists = board.Lists.filter(list => list.id !== action.data);
					return board;
				})
			};
		default:
			return state;
	}
};
