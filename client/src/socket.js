import io from "socket.io-client";
import { userActions, boardActions, currentActions } from "./actions";

const socket = io.connect("http://localhost:3001");

const _logOut = (dispatch, message) => {
  localStorage.setItem("token", "");
  dispatch(userActions.logOut(message));
  dispatch(boardActions.clear());
  dispatch(currentActions.clear());
};

const _auth = (dispatch, credentials) => {
  dispatch(userActions.setAuthenticating());
  socket.emit("authentication", credentials);
};

export default ({ dispatch }) => {
  // Authentication
  socket.on("authSuccess", ({ username, token, boards }) => {
    localStorage.setItem("token", token);
    dispatch(userActions.logIn(username, token));
    dispatch(boardActions.set(boards));
  });
  socket.on("authFail", message => _logOut(dispatch, message));

  // Update Current Board
  socket.on("getBoardSuccess", board => dispatch(currentActions.set(board)));
  socket.on("getBoardError", error => dispatch(currentActions.setError(error)));
};

// Authentication
export const authenticate = credentials => dispatch =>
  _auth(dispatch, credentials);
export const tokenAuth = () => dispatch => {
  const token = localStorage.getItem("token");
  if (token) _auth(dispatch, { token });
};
export const logOut = message => dispatch => _logOut(dispatch, message);

// Update Current Board
export const getBoard = slug => dispatch => {
  dispatch(currentActions.setFetching());
  socket.emit("getBoard", slug);
};
