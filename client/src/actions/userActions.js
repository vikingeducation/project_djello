export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";
export const SET_AUTHENTICATING = "SET_AUTHENTICATING";
export const SET_BOARDS = "SET_BOARDS";

export const setAuthenticating = () => ({
  type: SET_AUTHENTICATING
});

export const logOut = message => ({
  type: LOG_OUT,
  data: message
});

export const logIn = (username, boards) => {
  return {
    type: LOG_IN,
    data: { username, boards }
  };
};

export const setBoards = boards => {
  return {
    type: SET_BOARDS,
    data: boards
  };
};
