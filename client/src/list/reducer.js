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
	LIST_SET_CURRENT,
	LIST_SET,
	CARD_LIST_CREATE_SUCCESS,
	CARD_LIST_DELETE_SUCCESS
} from './constants';

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

function removeItemArray(array, obj) {
	return array.filter(item => {
		return item !== obj._id;
	})
}

function removeItemObject(obj, toRemove) {
	const key = toRemove._id
	const { [key]: del, ...restOfItems } = obj

	return restOfItems


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
					allIds: removeItemArray(state.lists.allIds, action.list),
					byId: removeItemObject(state.lists.byId, action.list)
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
							cards:  removeItemArray(state.lists.byId[action.card.listId].cards, action.card._id)
						}
					}

				}
			}

		default:
			return state;
	}
}

export default reducer;