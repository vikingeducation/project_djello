import io from "socket.io-client";
import { userActions, boardActions, listActions } from "./actions";

const socket = io.connect("http://localhost:3001");

// Private Methods
//////////////////
const _logOut = (dispatch, message) => {
  localStorage.setItem("token", "");
  dispatch(userActions.logOut(message));
  dispatch(boardActions.clear());
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
    dispatch(userActions.logIn(username, boards));
  });
  socket.on("authFail", message => _logOut(dispatch, message));

  // Board
  socket.on("getBoardSuccess", board => dispatch(boardActions.set(board)));
  socket.on("delBoardSuccess", boards => {
    dispatch(boardActions.clear());
    dispatch(userActions.setBoards(boards));
  });
  socket.on("addBoardSuccess", (board, boards) => {
    dispatch(userActions.setBoards(boards));
    dispatch(boardActions.set(board));
  });
  socket.on("boardError", error => dispatch(boardActions.setError(error)));

  // List
  socket.on("getListSuccess", (list, board) => {
    dispatch(listActions.set(list));
    dispatch(boardActions.set(board));
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
  dispatch(boardActions.setFetching());
  socket.emit("getBoard", slug);
};
export const delBoard = slug => dispatch => {
  dispatch(boardActions.setFetching());
  socket.emit("delBoard", slug);
};
export const addBoard = title => dispatch => {
  dispatch(boardActions.setFetching());
  socket.emit("addBoard", title);
};

// List
export const addList = title => dispatch => {
  dispatch(listActions.setFetching());
  socket.emit("addList", title);
};

export const addCard = title => dispatch => {
  console.log("Add Card: ", title);
};
