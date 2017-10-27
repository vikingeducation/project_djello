import * as Events from '../../socket/events';
const { REDUCERS, CLIENT, INTERNAL } = Events;

const initialMainState = {
	currentBoard: null,
	boardList: [],
	isWorking: false,
	error: null
};

export default (state = initialMainState, action) => {
	console.log(action);
	switch (action.type) {
		case INTERNAL.GET_BOARD:
		case INTERNAL.GET_BOARDS:
			return {
				...state,
				isWorking: true,
				error: null
			};
		case INTERNAL.GET_BOARD_SUCCESS:
			const retObj = {
				...state,
				isWorking: false
			};
			if (Array.isArray(action.data)) {
				retObj.boardList = action.data;
				if (retObj.currentBoard === null) {
					retObj.currentBoard = action.data[0];
				}
			} else {
				retObj.currentBoard = action.data;
			}
			return retObj;
		case INTERNAL.GET_BOARD_FAILURE:
			return {
				...state,
				error: action.err,
				isWorking: false
			};
		case CLIENT.CHANGE_SELECTED_BOARD:
			return {
				...state,
				currentBoard: action.board
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
