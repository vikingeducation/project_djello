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
  console.log('board reducer')
  const data = action.data
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
        ...data,
        isFetching: false
      }
    case Actions.UPDATE_BOARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...data
      }
    case Actions.GET_BOARD_FAILURE:
    case Actions.UPDATE_BOARD_FAILURE:
    case Actions.CREATE_BOARD_FAILURE:
    case Actions.UPDATE_LIST_FAILURE:
    case Actions.CREATE_LIST_FAILURE:
    case Actions.DELETE_LIST_FAILURE:
      return {
        ...state,
        error: data,
        isFetching: false
      }
    case Actions.DELETE_BOARD_SUCCESS:
      return {
        ...initialState
      }
    case Actions.UPDATE_LIST_SUCCESS:
    case Actions.CREATE_LIST_SUCCESS:
      const { id, ...rest } = data
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
      const list_ids = [...state.current.list_ids]
      list_ids.splice(list_ids.indexOf(data), 1)
      const lists_copy = {...state.lists }
      delete lists_copy[data]
      return {
        ...state,
        current: {
          ...state.current,
          list_ids: list_ids
        },
        lists: lists_copy
      }
    case Actions.CREATE_CARD_SUCCESS:
      return {
        ...state,
        cards: {
          ...state.cards,
          ...data
        },
        lists: {
          ...state.lists,
          [data.list_id]: {
            ...state.lists[data.list_id],
            card_ids: [...state.lists[data.list_id]['card_ids'], data.id]
          }
        }
      }
    case Actions.UPDATE_CARD_LIST_SUCCESS:
      return {
        ...state,
        lists: {
          ...state.lists,
          [data.old_list_id]: {
            ...state.lists[data.old_list_id],
            card_ids: state.lists[data.old_list_id]['card_ids'].filter(id => id != data.card_id)
          },
          [data.new_list_id]: {
            ...state.lists[data.new_list_id],
            card_ids: [...state.lists[data.new_list_id]['card_ids'], data.card_id]
          }
        }
      }
    case Actions.DELETE_CARD_SUCCESS:
      const card_copy = {...state.cards }
      delete card_copy[data.card_id]
      return {
        ...state,
        lists: {
          ...state.lists,
          [data.list_id]: {
            ...state.lists[data.list_id],
            card_ids: state.lists[data.list_id]['card_ids'].filter(item => item !== data.card_id)
          }
        },
        cards: card_copy
      }
    default:
      return state
  }
}