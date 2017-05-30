import {
  GET_BOARDS_SUCCESS,
  GET_REQUEST,
  GET_FAILURE,
  CHANGE_CURRENT_BOARD,
  CREATE_NEW_BOARD_SUCCESS,
  DELETE_BOARD_SUCCESS
} from "../actions/boards";

export default function boards(
  state = { data: {}, currentBoard: {}, error: null, isFetching: false },
  action
) {
  switch (action.type) {
    case GET_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case GET_BOARDS_SUCCESS:
      let currentBoard;
      if (action.data.boardId) {
        currentBoard = action.data.json.boards.find(
          board => board.id === +action.data.boardId
        );
      } else {
        currentBoard = state.currentBoard.name
          ? state.currentBoard
          : action.data.json.boards ? action.data.json.boards[0] : {};
      }
      return {
        ...state,
        isFetching: false,
        error: null,
        data: action.data.json,
        currentBoard
      };
    case CHANGE_CURRENT_BOARD:
      return {
        ...state,
        currentBoard: state.data.boards.find(board => board.id === +action.data)
      };
    case CREATE_NEW_BOARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: { ...state.data, boards: [...state.data.boards, action.data] },
        currentBoard: action.data.board
      };
    case DELETE_BOARD_SUCCESS:
      let currentBoardAfterDelete;
      if (state.data.boards.length > 1) {
        currentBoardAfterDelete = state.data.boards.filter(
          board => board.id !== +action.data
        )[0];
      } else {
        currentBoardAfterDelete = {};
      }
      return {
        ...state,
        isFetching: false,
        data: {
          ...state.data,
          boards: state.data.boards.filter(board => board.id !== +action.data)
        },
        currentBoard: currentBoardAfterDelete
      };
    default:
      return state;
  }
}
