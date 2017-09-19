import {
  START_REQUEST,
  CREATE_BOARD_SUCESS,
  BOARD_FAILURE,
  GET_BOARDS_SUCCESS,
  GET_BOARD_SUCCESS,
  DELETE_REQUEST_SUCCESS
} from "../actions/board";
//
// const intialState = {
//   isFetching: false,
//   error: null,
//   success: null,
//   board: null,
//   boards: null
// };

const board = (state = {}, action) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        isFetching: true,
        ...state
      };
    case CREATE_BOARD_SUCESS:
      return {
        ...state,
        isFetching: false
        // board: action.data
      };
    case BOARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.data
      };
    case GET_BOARDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        boards: action.data
      };
    case GET_BOARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        board: action.data
      };
    case DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};
export default board;
