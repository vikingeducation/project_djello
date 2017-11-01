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
    case Actions.UPDATE_LIST_FAILURE:
    case Actions.CREATE_LIST_FAILURE:
    case Actions.DELETE_LIST_FAILURE:
      return {
        ...state,
        error: action.data,
        isFetching: false
      }
    case Actions.DELETE_BOARD_SUCCESS:
      return {
        ...initialState
      }
    case Actions.UPDATE_LIST_SUCCESS:
    case Actions.CREATE_LIST_SUCCESS:
      const { id, ...rest } = action.data
      return {
        ...state,
        current: {
          ...state.current,
          list_ids: [...state.current.list_ids, id]
        },
        lists: {
          ...state.lists,
          [id]: rest
        }
      }
    case Actions.DELETE_LIST_SUCCESS:
      console.log('state.current.lists', state, action.data)
      const list_ids = [...state.current.list_ids]
      list_ids.splice(list_ids.indexOf(action.data), 1)
      const lists_copy = {...state.lists }
      delete lists_copy[action.data]
      console.log('lists_copy', lists_copy)
      return {
        ...state,
        current: {
          ...state.current,
          list_ids: list_ids
        },
        lists: lists_copy
      }
    default:
      return state
  }
}