import { userActions } from "../actions";

const defaultState = {
  username: "",
  authenticating: false,
  authMessage: ""
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case userActions.LOG_IN:
      return {
        username: action.data,
        authenticating: false,
        authMessage: ""
      };
    case userActions.LOG_OUT:
      return {
        username: "",
        authenticating: false,
        authMessage: action.data
      };
    case userActions.SET_AUTHENTICATING:
      return {
        ...state,
        authenticating: true
      };
    default:
      return state;
  }
};

export default user;
