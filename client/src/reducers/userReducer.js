import * as Actions from '../actions/actionTypes'

const initialState = {
  isFetching: false,
  error: null
}

function user(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        ...action.data
      }
    case Actions.GET_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.data,
      }
    case Actions.GET_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        ...action.data
      }
    default:
      return state
  }

}

export default user