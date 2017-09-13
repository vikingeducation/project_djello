import * as Actions from "../actions";

const initialState = {
  awaitingLogin: false,
  loggedIn: false,
  loginFailureMessage: "",
  user: {}
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case Actions.START_AWAIT_LOGIN:
      return {
        ...state,
        awaitingLogin: true
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
    default:
      return state;
  }
};
