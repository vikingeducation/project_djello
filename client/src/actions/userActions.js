import socket from "../socket";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";
export const SET_AUTHENTICATING = "SET_AUTHENTICATING";

const logIn = (username, token) => {
  return {
    type: LOG_IN,
    data: { username, token }
  };
};

const setAuthenticating = () => {
  return {
    type: SET_AUTHENTICATING
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT
  };
};

const auth = (credentials, dispatch, action) => {
  dispatch(setAuthenticating());
  socket.emit(action, credentials);
  socket.on("authSuccess", token => {
    console.log("Success!");
    dispatch(logIn(credentials.username, token));
  });
  socket.on("authFail", () => {
    console.log("Failure!");
    dispatch(logOut());
  });
};

export const authenticate = credentials => dispatch => {
  auth(credentials, dispatch, "authentication");
};

export const register = credentials => dispatch => {
  auth({ ...credentials, register: true }, dispatch, "authentication");
};
