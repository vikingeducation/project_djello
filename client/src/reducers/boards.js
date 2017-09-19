import { BoardsActions } from "../actions";
import {
  BOARDS_REQUEST,
  BOARDS_GET_SUCCESS,
  BOARDS_GET_FAILURE
} from "../actions/constants";

const initialState = {
  boardsData: [],
  isFetching: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOARDS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case BOARDS_GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        boardsData: action.data
      };
    case BOARDS_GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};
