import * as Actions from "../actions";

const initialState = {
  fetching: false,
  loggedIn: localStorage.getItem("token") || false,
  user: "",
  boards: [],
  board: {},
  boardFailureMessage: null,
  lists: []
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case Actions.START_AWAIT_LOGIN:
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
    case Actions.POPULATE_BOARDS:
      return {
        ...state,
        boards: action.data
      };
    case Actions.POPULATE_LISTS:
      return {
        ...state,
        lists: action.data
      };
    case Actions.POPULATE_LIST:
      return {
        ...state,
        lists: [
          ...state.lists.map(
            list => (list._id !== action.data._id ? list : action.data)
          )
        ]
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
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        loginFailureMessage: action.data,
        fetching: false
      };
    case Actions.LOG_OUT:
      return {
        ...state,
        user: {},
        loggedIn: false
      };
    default:
      return state;
  }
};

export default app;
