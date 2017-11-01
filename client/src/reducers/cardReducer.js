import * as Actions from '../actions/actionTypes'

const initialState = {
  error: null,
  isFetching: false,
  cards: {}
}

export default function cards(state = initialState, action) {
  switch (action.type) {
    case Actions.CREATE_CARD_FAILURE:
    case Actions.GET_CARD_FAILURE:
      return {
        ...state,
        error: action.data,
        isFetching: false
      }
    case Actions.CREATE_CARD_REQUEST:
    case Actions.GET_CARD_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case Actions.CREATE_CARD_SUCCESS:
    case Actions.GET_CARD_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        cards: {
          ...state.cards,
          ...action.data
        }
      }

    default:
      return state
  }
}