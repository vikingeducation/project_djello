import * as Actions from "./actions";

const initailState = {
  cookie: "",
  user: "",
  currentBoard: "",
  users: [],
  isFetching: false,
  error: null
};

export function djello(state = initailState, action) {
  console.log("Redux--", action);
  switch (action.type) {
    case Actions.SET_COOKIE:
      return {
        ...state,
        cookie: action.data,
        user: action.data.split(":")[0]
      };
    case Actions.SET_USERS:
      return {
        ...state,
        users: action.data,
        isFetching: false
      };
    case Actions.GET_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null
      };
    case Actions.GET_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
