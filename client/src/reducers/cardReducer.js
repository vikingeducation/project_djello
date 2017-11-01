import * as Actions from '../actions/actionTypes'

const initialState = {
  error: null,
  isFetching: false
}

export default function cards(state = initialState, action) {
  switch (action.type) {
    case Actions.CREATE_CARD_FAILURE:
      return {
        ...state,
        error: action.data,
        isFetching: false
      }
    case Actions.CREATE_CARD_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case Actions.CREATE_CARD_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false
      }

    default:
      return state
  }
}