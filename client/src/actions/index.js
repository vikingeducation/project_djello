import { makeOptions } from "../services/actionsHelper";
const BASE_LOGIN_API = "api/login";
const BASE_CREATE_BOARD = "api/boards/new";
const BASE_USER = "api/user";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const START_AWAIT_LOGIN = "START_AWAIT_LOGIN";
export const LOG_OUT = "LOG_OUT";
export const START_AWAIT_BOARD = "START_AWAIT_BOARD";
export const CREATE_BOARD_SUCCESS = "CREATE_BOARD_SUCCESS";
export const CREATE_BOARD_FAILURE = "CREATE_BOARD_FAILURE";
export const POPULATE_BOARDS = "POPULATE_BOARDS";

export const startAwaitLogin = () => {
  return {
    type: START_AWAIT_LOGIN
  };
};

export const startAwaitBoard = () => {
  return {
    type: START_AWAIT_BOARD
  };
};

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    data: user
  };
};

export const loginFailure = message => {
  return {
    type: LOGIN_FAILURE,
    data: message
  };
};

export const populateBoards = boards => {
  return {
    type: POPULATE_BOARDS,
    data: boards
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  return {
    type: LOG_OUT
  };
};

export const createBoardSuccess = board => {
  return {
    type: CREATE_BOARD_SUCCESS,
    data: board
  };
};

export const createBoardFailure = error => {
  return {
    type: CREATE_BOARD_SUCCESS,
    data: error
  };
};

export const createBoard = newBoard => async dispatch => {
  dispatch(startAwaitBoard());
  const options = makeOptions(
    JSON.stringify(newBoard),
    "POST",
    localStorage.getItem("token")
  );
  const response = await fetch(BASE_CREATE_BOARD, options);
  if (response.status === 400)
    return dispatch(createBoardFailure("Bad request"));
  const board = await response.json();
  dispatch(createBoardSuccess(board));
};

export const getAuthenticatedUser = token => async dispatch => {
  console.log("getting here?");
  const options = makeOptions("", "GET", localStorage.getItem("token"));
  const response = await fetch(BASE_USER, options);
  const user = await response.json();
  console.log(user);
  dispatch(loginSuccess(user));
  dispatch(populateBoards(user.boards));
};

export const login = credentials => async dispatch => {
  dispatch(startAwaitLogin());
  const options = makeOptions(JSON.stringify(credentials), "POST", null);
  try {
    const response = await fetch(BASE_LOGIN_API, options);
    const user = await response.json();
    if (response.status === 401)
      return dispatch(loginFailure("You screwed up"));
    localStorage.setItem("token", user.token);
    dispatch(loginSuccess(user));
    dispatch(populateBoards(user.boards));
  } catch (err) {
    dispatch(loginFailure("Something went wrong, please try again"));
  }
};
