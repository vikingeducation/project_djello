import {
  START_REQUEST,
  CREATE_BOARD_SUCCESS,
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
    case CREATE_BOARD_SUCCESS:
      let boards = state.boards.slice(0);
      boards.push(action.data);
      return {
        ...state,
        boards,
        isFetching: false
      };
    case DELETE_REQUEST_SUCCESS:
      const filteredBoards = state.boards.filter(board => {
        if (board._id !== action.data) return board;
      });
      console.log("boards = ", filteredBoards);
      return {
        ...state,
        boards: filteredBoards,
        isFetching: false
      };
    case BOARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.data
      };

    default:
      return state;
  }
};
export default board;
