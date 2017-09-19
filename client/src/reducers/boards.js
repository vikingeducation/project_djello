import * as Actions from "../actions";

const initialState = {
  fetching: false,
  boards: [],
  board: {},
  boardFailureMessage: null
};

export const boards = (state = initialState, action) => {
  switch (action.type) {
    case Actions.POPULATE_BOARDS:
      return {
        ...state,
        boards: action.data
      };
    case Actions.POPULATE_BOARD:
      return {
        ...state,
        board: action.data
      };
    case Actions.CREATE_BOARD_SUCCESS:
      return {
        ...state,
        fetching: false,
        boards: [...state.boards, action.data]
      };
    case Actions.CREATE_BOARD_FAILURE:
      return {
        ...state,
        fetching: false,
        boardFailureMessage: action.data
      };
    default:
      return state;
  }
};
