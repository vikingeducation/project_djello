import * as Actions from "../actions";

console.log(localStorage.getItem("token"));

const initialState = {
  awaitingLogin: false,
  awaitingBoard: false,
  loggedIn: localStorage.getItem("token") || false,
  loginFailureMessage: "",
  boardFailureMessage: null,
  user: {},
  boards: [{ title: "Example Board", id: 1 }],
  cards: [],
  lists: []
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case Actions.START_AWAIT_LOGIN:
      return {
        ...state,
        awaitingLogin: true
      };
    case Actions.START_AWAIT_BOARD:
      return {
        ...state,
        awaitingBoard: true
      };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.data,
        awaitingLogin: false
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        loginFailureMessage: action.data,
        awaitingLogin: false
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
        awaitingBoard: false,
        boards: [...state.boards, action.data]
      };
    case Actions.CREATE_BOARD_FAILURE:
      return {
        ...state,
        awaitingBoard: false,
        boardFailureMessage: action.data
      };
    default:
      return state;
  }
};
