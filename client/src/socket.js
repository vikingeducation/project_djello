import io from "socket.io-client";
import {
  userActions,
  boardActions,
  currentActions,
  listActions
} from "./actions";

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
    dispatch(userActions.logIn(username));
    dispatch(boardActions.set(boards));
  });
  socket.on("authFail", message => _logOut(dispatch, message));

  // Board
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

  // List
  socket.on("getListSuccess", (list, board) => {
    console.log("gls!");
    dispatch(listActions.set(list));
    dispatch(currentActions.set(board));
  });

  socket.on("listError", error => dispatch(listActions.set(error)));
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

// Board
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
export const addBoard = title => dispatch => {
  console.log("add", title);
  dispatch(currentActions.setFetching());
  socket.emit("addBoard", title);
};

// List
export const addList = title => dispatch => {
  console.log("Add List: ", title);
  dispatch(listActions.setFetching());
  socket.emit("addList", title);
};

export const addCard = title => dispatch => {
  console.log("Add Card: ", title);
};
