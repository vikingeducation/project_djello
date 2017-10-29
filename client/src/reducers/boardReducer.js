import * as Actions from '../actions/actionTypes'

const initialState = {
  current: {},
  board_list: [],
  lists: [],
  cards: [],
  error: null,
  isFetching: false,
}

export default function board(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_BOARD_REQUEST:
    case Actions.UPDATE_BOARD_REQUEST:
    case Actions.DELETE_BOARD_REQUEST:
    case Actions.CREATE_BOARD_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case Actions.GET_BOARD_SUCCESS:
    case Actions.CREATE_BOARD_SUCCESS:
      return {
        ...state,
        ...action.data,
        isFetching: false
      }
    case Actions.UPDATE_BOARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.data
      }
    case Actions.GET_BOARD_FAILURE:
    case Actions.UPDATE_BOARD_FAILURE:
    case Actions.CREATE_BOARD_FAILURE:
      return {
        ...state,
        error: action.data,
        isFetching: false
      }
    case Actions.DELETE_BOARD_SUCCESS:
      return {
        ...initialState
      }
    default:
      return state
  }
}