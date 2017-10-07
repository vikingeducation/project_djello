import { userActions } from "../actions";

const defaultState = {
  username: "",
  authenticating: false,
  authMessage: "",
  boards: []
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case userActions.LOG_IN:
      const { username, boards } = action.data;
      return {
        username,
        boards,
        authenticating: false,
        authMessage: ""
      };
    case userActions.LOG_OUT:
      return { ...defaultState };
    case userActions.SET_AUTHENTICATING:
      return { ...state, authenticating: true };
    case userActions.SET_BOARDS:
      return { ...state, boards: action.data };
    default:
      return state;
  }
};

export default user;
