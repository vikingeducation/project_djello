const {
	LIST_SET,
	LIST_CREATING,
	LIST_CREATE_ERROR,
	LIST_CREATE_SUCCESS
} = require('./constants');



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



const reducer = function(state = initialState, action) {
	switch(action.type) {
		case LIST_SET: 
			return {
				lists: action.lists,
				requesting: false,
				successful: true,
				messages: [],
				errors: [],
			}

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
				lists: { ...state.lists, ...action.list },
				requesting: false,
				successful: true,
				messages: [],
				errors: [],
			}

		case LIST_CREATE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				messages: [],
				errors: []
			}

		default:
			return state;

	}
}


export default reducer;