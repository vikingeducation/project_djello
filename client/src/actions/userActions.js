import socket from "../socket";
import {
  set as setBoards,
  clear as clearBoards
} from "../actions/boardActions";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";
export const SET_AUTHENTICATING = "SET_AUTHENTICATING";

const setAuthenticating = () => ({
  type: SET_AUTHENTICATING
});

const setLoggedOut = message => ({
  type: LOG_OUT,
  data: message
});

const logIn = (username, token) => {
  localStorage.setItem("token", token);
  return {
    type: LOG_IN,
    data: { username, token }
  };
};

export const logOut = message => dispatch => {
  localStorage.setItem("token", "");
  dispatch(clearBoards());
  dispatch(setLoggedOut());
};

const auth = (credentials, dispatch) => {
  dispatch(setAuthenticating());
  socket.emit("authentication", credentials);
  socket.on("authSuccess", ({ username, token, boards, cards }) => {
    dispatch(logIn(username, token));
    dispatch(setBoards(boards));
  });
  socket.on("authFail", message => dispatch(logOut(message)));
};

export const credentialAuth = credentials => dispatch =>
  auth(credentials, dispatch);

export const register = credentials => dispatch =>
  auth({ ...credentials, register: true }, dispatch);

export const tokenAuth = () => dispatch => {
  const token = localStorage.getItem("token");
  if (token) auth({ token }, dispatch);
};
