import { userActions } from "../actions";

const defaultState = {
  username: "",
  token: "",
  authenticating: false
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case userActions.LOG_IN:
      return {
        username: action.data.username,
        token: action.data.token,
        authenticating: false
      };
    case userActions.LOG_OUT:
      return {
        username: "",
        token: "",
        authenticating: false
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
