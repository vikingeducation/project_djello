import {
	LIST_CREATING,
	LIST_CREATE_SUCCESS,
	LIST_CREATE_ERROR,
	LIST_UPDATING,
	LIST_UPDATE_SUCCESS,
	LIST_UPDATE_ERROR,
	LIST_DELETING,
	LIST_DELETE_SUCCESS,
	LIST_DELETE_ERROR,
	LIST_SET,
	BOARD_LIST_DELETE_SUCCESS,
	CARD_LIST_CREATE_SUCCESS,
	CARD_LIST_DELETE_SUCCESS
} from './constants';

import { 
	removeIdFromAllIds,
	removeObjById,
	removeObjByParentId,
	removeIdByParentId
} from '../helpers/reducer_helpers';

const initialState = {
	lists: {
		byId: {},
		allIds: [],
	},
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
}


const reducer = function listReducer(state = initialState, action) {
	switch(action.type) {
		case LIST_CREATING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `List ${ action.list.title } being created...`,
					time: new Date(),
				}],
				errors: [],
			}

		case LIST_CREATE_SUCCESS:
			return {
				...state,
				lists: {
					allIds: [ ...state.lists.allIds, action.list._id ],
					byId: {
						...state.lists.byId,
						[action.list._id]: action.list
					}
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `List: ${ action.list.title } created!`,
					time: new Date(),
				}],
				errors: [],
			}

		case LIST_CREATE_ERROR:
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
			
		case LIST_SET:
			return {
				...state,
				lists: action.lists,
				requesting: false,
				successful: true,
				messages: [{
					body: `Lists set!`,
					time: new Date(),
				}],
				errors: [],
			}

		case LIST_UPDATING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `List ${ action.list._id } being updated...`,
					time: new Date(),
				}],
				errors: [],
			}

		case LIST_UPDATE_SUCCESS:
			return {
				...state,
				lists: {
					allIds: [...state.lists.allIds],
					byId: {
						...state.lists.byId,
						[action.list._id]: action.list
					}
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `List: ${ action.list._id } updated!`,
					time: new Date(),
				}],
				errors: [],
			}

		case LIST_UPDATE_ERROR:
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

		case LIST_DELETING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `List ${ action.list.title } being deleted...`,
					time: new Date(),
				}],
				errors: [],
			}

		case LIST_DELETE_SUCCESS:
			return {
				...state,
				lists: {
					allIds: removeIdFromAllIds(state.lists.allIds, action.list),
					byId: removeObjById(state.lists.byId, action.list)
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `List: ${ action.list.title } deleted!`,
					time: new Date(),
				}],
			}

		case LIST_DELETE_ERROR:
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

		case CARD_LIST_CREATE_SUCCESS:
			return {
				...state,
				lists: {
					...state.lists,
					byId: {
						...state.lists.byId,
						[action.card.listId]: {
							...state.lists.byId[action.card.listId],
							cards: [ ...state.lists.byId[action.card.listId].cards, action.card._id ]
						}
					}

				}
			}

		case CARD_LIST_DELETE_SUCCESS:
			return {
				...state,
				lists: {
					...state.lists,
					byId: {
						...state.lists.byId,
						[action.card.listId]: {
							...state.lists.byId[action.card.listId],
							cards:  removeIdFromAllIds(state.lists.byId[action.card.listId].cards, action.card)
						}
					}

				}
			}

		case BOARD_LIST_DELETE_SUCCESS:
			return {
				...state,
				lists: {
					byId: removeObjByParentId(state.lists.byId, action.board, 'boardId'),
					allIds: removeIdByParentId(state.lists.byId, action.board, 'boardId'),
				}
			}

		default:
			return state;
	}
}

export default reducer;