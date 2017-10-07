import { boardActions } from "../actions";

const defaultState = {
  data: {},
  fetching: false,
  error: ""
};

const board = (state = defaultState, action) => {
  switch (action.type) {
    case boardActions.SET_BOARD:
      return { data: action.data, error: "", fetching: false };
    case boardActions.CLEAR_BOARD:
      return { ...defaultState };
    case boardActions.SET_BOARD_FETCH:
      return { ...state, fetching: true };
    case boardActions.SET_BOARD_ERROR:
      return { ...state, fetching: false, error: action.data };
    default:
      return state;
  }
};

export default board;
