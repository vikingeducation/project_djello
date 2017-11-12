import * as Actions from '../actions/actionTypes'

const initialState = {
  error: null,
  isFetching: false,
  details: {}
}

export default function cards(state = initialState, action) {
  const data = action.data
  switch (action.type) {
    case Actions.CREATE_CARD_FAILURE:
    case Actions.GET_CARD_FAILURE:
    case Actions.UPDATE_CARD_FAILURE:
      return {
        ...state,
        error: data,
        isFetching: false
      }
    case Actions.CREATE_CARD_REQUEST:
    case Actions.GET_CARD_REQUEST:
    case Actions.UPDATE_CARD_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case Actions.CREATE_CARD_SUCCESS:
    case Actions.GET_CARD_SUCCESS:
    case Actions.UPDATE_CARD_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        details: {
          ...state.details,
          ...data
        }
      }
    case Actions.DELETE_CARD_MEMBER_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        details: {
          ...state.details,
          [data.card_id]: {
            ...state.details[data.card_id],
            members: state.details[data.card_id]['members'].filter(member =>
              member.id !== data.member_id)
          }
        }
      }
    case Actions.ADD_CARD_MEMBER_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        details: {
          ...state.details,
          [data.card_id]: {
            ...state.details[data.card_id],
            members: [...state.details[data.card_id]['members'], data.member]
          }
        }
      }
    default:
      return state
  }
}