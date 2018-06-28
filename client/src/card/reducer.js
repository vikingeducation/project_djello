import {
	CARD_CREATING,
	CARD_CREATE_SUCCESS,
	CARD_CREATE_ERROR,
	CARD_SET,
	CARD_UPDATING,
	CARD_UPDATE_SUCCESS,
	CARD_UPDATE_ERROR,
	CARD_DELETING,
	CARD_DELETE_SUCCESS,
	CARD_DELETE_ERROR,
	LIST_CARD_DELETE_SUCCESS,
	BOARD_LIST_CARD_DELETE_SUCCESS
} from './constants'

import { 
	removeIdFromAllIds,
	removeObjById,
	removeObjByParentId,
	removeIdByParentId,
	removeCardsByListIds,
	removeCardIdsByListIds
} from '../helpers/reducer_helpers';

const initialState = {
	cards: {
		byId: {},
		allIds: [],
	},
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
}

const reducer = function(state = initialState, action) {
	switch(action.type) {
		
		case CARD_CREATING: 
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `Card ${ action.card.title } being created...`,
					time: new Date(),
				}],
				errors: [],
			}

		case CARD_CREATE_SUCCESS:
			return {
				cards: {
					byId: {
						...state.cards.byId,
						[action.card._id]: action.card,
					},
					allIds: [
						...state.cards.allIds,
						action.card._id
					]
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `Board: ${ action.card.title } created!`,
					time: new Date(),
				}],
				errors: [],
			}

		case CARD_CREATE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: new Date(),
				}])
			}

		case CARD_SET: 
			return {
				cards: {
					byId: action.cards.byId,
					allIds: action.cards.allIds,
				},
				requesting: false,
				successful: true,
				messages: [],
				errors: [],
			}

		case CARD_UPDATING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `Card ${ action.card._id } being updated...`,
					time: new Date(),
				}],
				errors: [],
			}

		case CARD_UPDATE_SUCCESS:
			return {
				...state,
				cards: {
					...state.cards,
					byId: {
						...state.cards.byId,
						[action.card._id]: action.card
					}
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `Card: ${ action.card._id } updated!`,
					time: new Date(),
				}],
				errors: [],
			}

		case CARD_UPDATE_ERROR:
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

		case CARD_DELETING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `Card ${ action.card.title } being deleted...`,
					time: new Date(),
				}],
				errors: [],
			}

		case CARD_DELETE_SUCCESS:
			return {
				...state,
				cards: {
					allIds: removeIdFromAllIds(state.cards.allIds, action.card),
					byId: removeObjById(state.cards.byId, action.card)
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `List: ${ action.card.title } deleted!`,
					time: new Date(),
				}],
			}

		case CARD_DELETE_ERROR:
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

		case LIST_CARD_DELETE_SUCCESS:
			return {
				...state,
				cards: {
					byId: removeObjByParentId(state.cards.byId, action.list, 'listId'),
					allIds: removeIdByParentId(state.cards.byId, action.list, 'listId'),
				}
			}

		case BOARD_LIST_CARD_DELETE_SUCCESS:
			return {
				...state,
				cards: {
					byId: removeCardsByListIds(state.cards.byId, action.board.lists),
					allIds: removeCardIdsByListIds(state.cards.byId, action.board.lists)
					
				}
			}

		default:
			return state;

	}
}

export default reducer;