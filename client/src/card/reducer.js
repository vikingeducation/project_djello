const {
	CARD_SET,
	CARD_CREATING,
	CARD_CREATE_ERROR,
	CARD_CREATE_SUCCESS,
} = require('./constants');


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
						...action.card.byId,
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

		default:
			return state;

	}
}

export default reducer;