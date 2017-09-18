import { ListsActions } from "../actions";
import {
  LISTS_REQUEST,
  LISTS_GET_SUCCESS,
  LISTS_GET_FAILURE
} from "../actions/constants";

const initialState = {
  listsData: [],
  isFetching: false,
  error: null,
  board: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LISTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case LISTS_GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        listsData: !state.board
          ? action.data
          : action.data.filter(list => list.board === state.board)
      };
    case LISTS_GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};
