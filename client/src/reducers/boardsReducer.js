import {
  GET_BOARDS_SUCCESS,
  GET_BOARDS_REQUEST,
  GET_BOARDS_FAILURE,
  CHANGE_CURRENT_BOARD,
  CREATE_NEW_BOARD_SUCCESS
} from "../actions/boards";

export default function boards(
  state = { data: {}, currentBoard: {}, error: null, isFetching: false },
  action
) {
  switch (action.type) {
    case GET_BOARDS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case GET_BOARDS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case GET_BOARDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        currentBoard: state.currentBoard.name
          ? state.currentBoard
          : action.data.boards ? action.data.boards[0] : {}
      };
    case CHANGE_CURRENT_BOARD:
      return {
        ...state,
        currentBoard: action.data
      };
    case CREATE_NEW_BOARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: { ...state.data, boards: [...state.data.boards, action.data] },
        currentBoard: action.data.board
      };
    default:
      return state;
  }
}
