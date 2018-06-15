import {
	BOARD_CREATING,
	BOARD_CREATE_SUCCESS,
	BOARD_CREATE_ERROR,
	BOARD_UPDATING,
	BOARD_UPDATE_SUCCESS,
	BOARD_UPDATE_ERROR,
	BOARD_DELETING,
	BOARD_DELETE_SUCCESS,
	BOARD_DELETE_ERROR,
	BOARD_SET_CURRENT,
	BOARD_SET,
} from './constants';

const initialState = {
	current: '',
	boards: {
		byId: {},
		allIds: [],
	},
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
}

function removeItemArray(array, action) {
	return array.filter(item => {
		return item !== action.board._id;
	})
}

function removeItemObject(obj, action) {
	const key = action.board._id
	const { [key]: del, ...restOfItems } = obj

	return restOfItems


}

const reducer = function boardReducer(state = initialState, action) {
	switch(action.type) {
		case BOARD_CREATING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `Board ${ action.board.title } being created...`,
					time: new Date(),
				}],
				errors: [],
			}

		case BOARD_CREATE_SUCCESS:
			return {
				...state,
				boards: {
					allIds: [ ...state.boards.allIds, action._id ],
					byId: {
						...state.boards.byId,
						[action._id]: action.board
					}
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `Board: ${ action.board.title } created!`,
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

		case BOARD_UPDATING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `Board ${ action.board._id } being updated...`,
					time: new Date(),
				}],
				errors: [],
			}

		case BOARD_UPDATE_SUCCESS:
			return {
				...state,
				boards: {
					allIds: [...state.boards.allIds],
					byId: {
						...state.boards.byId,
						[action.board._id]: action.board
					}
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `Board: ${ action.board._id } updated!`,
					time: new Date(),
				}],
				errors: [],
			}

		case BOARD_UPDATE_ERROR:
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

		case BOARD_DELETING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `Board ${ action.board.title } being deleted...`,
					time: new Date(),
				}],
				errors: [],
			}

		case BOARD_DELETE_SUCCESS:
			return {
				...state,
				boards: {
					allIds: removeItemArray(state.boards.allIds, action._id),
					byId: removeItemObject(state.boards.byId, action.board)
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `Board: ${ action.board.title } deleted!`,
					time: new Date(),
				}],
			}

		case BOARD_DELETE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				messages: [],
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: new Date(),
				}])
			}

		case BOARD_SET:
			return {
				...state,
				boards: action.boards,
				requesting: false,
				successful: true,
				messages: [{
					body: `Boards set!`,
					time: new Date(),
				}],
				errors: [],
			}

		case BOARD_SET_CURRENT:
			return {
				...state,
				current: action.board,
			}

		default:
			return state;
	}
}

export default reducer;