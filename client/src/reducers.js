import {
	SET_USER,
	SET_BOARDS,
	ADD_BOARD,
	REMOVE_BOARD,
	ADD_LIST,
	REMOVE_LIST,
	UPDATE_LIST,
	ADD_CARD,
	REMOVE_CARD
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
		case UPDATE_LIST:
			return {
				...state,
				boards: state.boards.map(board => {
					return board.id === action.data.boardId
						? {
								...board,
								Lists: board.Lists.map(list => {
									return list.id === action.data.listId
										? action.data.list
										: list;
								})
							}
						: board;
				})
			};
		case ADD_CARD:
			return {
				...state,
				boards: state.boards.map(board => {
					board.Lists = board.Lists.map(list => {
						list.Cards =
							list.id === action.data.listId
								? [...list.Cards, action.data.card]
								: list.Cards;

						return list;
					});

					return board;
				})
			};
		case REMOVE_CARD:
			return {
				...state,
				boards: state.boards.map(board => {
					board.Lists = board.Lists.map(list => {
						list.Cards = list.Cards.filter(card => card.id !== action.data);
						return list;
					});
					return board;
				})
			};
		default:
			return state;
	}
};
