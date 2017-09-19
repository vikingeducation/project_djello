import io from "socket.io-client";
import { userActions, boardActions, currentActions } from "./actions";

const socket = io.connect("http://localhost:3001");

// Private Methods
//////////////////
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

// Event Handlers
/////////////////
export default ({ dispatch }) => {
  // Authentication
  socket.on("connect", () => dispatch(tokenAuth()));
  socket.on("authSuccess", ({ username, token, boards }) => {
    localStorage.setItem("token", token);
    dispatch(userActions.logIn(username, token));
    dispatch(boardActions.set(boards));
  });
  socket.on("authFail", message => _logOut(dispatch, message));

  // Current Board
  socket.on("getBoardSuccess", board => dispatch(currentActions.set(board)));
  socket.on("delBoardSuccess", boards => {
    dispatch(currentActions.clear());
    dispatch(boardActions.set(boards));
  });
  socket.on("addBoardSuccess", (board, boards) => {
    dispatch(boardActions.set(boards));
    dispatch(currentActions.set(board));
  });
  socket.on("boardError", error => dispatch(currentActions.setError(error)));
};

// Event Emitters
/////////////////

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
  console.log("get: ", slug);
  dispatch(currentActions.setFetching());
  socket.emit("getBoard", slug);
};
export const delBoard = slug => dispatch => {
  console.log("del: ", slug);
  dispatch(currentActions.setFetching());
  socket.emit("delBoard", slug);
};
export const addBoard = () => dispatch => {
  console.log("add");
  dispatch(currentActions.setFetching());
  socket.emit("addBoard");
};
