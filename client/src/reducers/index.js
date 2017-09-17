import * as Actions from "../actions";

const initialState = {
  fetching: false,
  loggedIn: localStorage.getItem("token") || false,
  loginFailureMessage: "",
  boardFailureMessage: null,
  user: "",
  boards: [],
  cards: [],
  lists: []
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case Actions.START_AWAIT_LOGIN:
      return {
        ...state,
        fetching: true
      };
    case Actions.START_AWAIT_BOARD:
      return {
        ...state,
        fetching: true
      };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.data,
        fetching: false
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        loginFailureMessage: action.data,
        fetching: false
      };
    case Actions.POPULATE_BOARDS:
      return {
        ...state,
        boards: action.data
      };
    case Actions.LOG_OUT:
      return {
        ...state,
        user: {},
        loggedIn: false
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
