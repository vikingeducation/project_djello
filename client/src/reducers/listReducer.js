import * as Actions from '../actions/actionTypes'

const initialState = {
  error: {}
}

export default function list(state = initialState, action) {
  switch (action.type) {
    case Actions.UPDATE_LIST_FAILURE:
    case Actions.CREATE_LIST_FAILURE:
    case Actions.DELETE_LIST_FAILURE:
      return {
        ...state,
        error: action.data
      }
    default:
      return state
  }
}