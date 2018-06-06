import {
	BOARD_CREATING,
	BOARD_CREATE_SUCCESS,
	BOARD_CREATE_ERROR,
	BOARD_REQUESTING,
	BOARD_REQUEST_SUCCESS,
	BOARD_REQUEST_ERROR
} from './constants';

const initialState = {
	list: [],
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
}

const reducer = function boardReducer(state = initialState, action) {
	switch(action.type) {
		case BOARD_CREATING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `Board ${ action.board.name } being created...`,
					time: new Date(),
				}],
				errors: [],
			}

		case BOARD_CREATE_SUCCESS:
			return {
				list: state.list.concat([action.board]),
				requesting: false,
				successful: true,
				messages: [{
					body: `Board: ${ action.board.name } created!`,
					time: new Date(),
				}],
				errors: [],
			}

		case BOARD_CREATE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				messsages: [],
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: new Date(),
				}])
			}

		case BOARD_REQUESTING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: 'Fetching boards...',
					time: new Date(),
				}],
				errors: [],
			}

		case BOARD_REQUEST_SUCCESS:
			return {
				list: action.boards,
				requesting: false,
				successful: true,
				messages: [{
					body: 'Boards fetched!',
					time: new Date(),
				}],
				errors: [],
			}

		default:
			return state;
	}
}

export default reducer;