import { makeOptions } from "../services/actionsHelper";
const BASE_URI = "http://localhost:3001";
const BASE_LOGIN = "api/login";
const BASE_BOARD = "api/boards";
const BASE_USER = "api/user";
const BASE_LIST = "api/lists";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const START_AWAIT_LOGIN = "START_AWAIT_LOGIN";
export const LOG_OUT = "LOG_OUT";
export const START_AWAIT_BOARD = "START_AWAIT_BOARD";
export const CREATE_BOARD_SUCCESS = "CREATE_BOARD_SUCCESS";
export const CREATE_BOARD_FAILURE = "CREATE_BOARD_FAILURE";
export const POPULATE_BOARDS = "POPULATE_BOARDS";
export const POPULATE_CARDS = "POPULATE_CARDS";
export const POPULATE_LISTS = "POPULATE_LISTS";
export const CREATE_LIST_SUCCESS = "CREATE_LIST_SUCCESS";
export const CREATE_LIST_FAILURE = "CREATE_LIST_FAILURE";

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

export const populateCards = cards => {
  return {
    type: POPULATE_CARDS,
    data: cards
  };
};

export const populateLists = lists => {
  return {
    type: POPULATE_LISTS,
    data: lists
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
    type: CREATE_BOARD_FAILURE,
    data: error
  };
};

export const createListSuccess = board => {
  return {
    type: CREATE_LIST_SUCCESS,
    data: board
  };
};

export const createListFailure = error => {
  return {
    type: CREATE_LIST_FAILURE,
    data: error
  };
};

export const getLists = boardId => async dispatch => {
  console.log(boardId);
  const response = await fetch(`${BASE_URI}/${BASE_BOARD}/${boardId}`);
  const populatedBoard = await response.json();
  dispatch(populateLists(populatedBoard.lists));
};

export const createList = newList => async dispatch => {
  const body = JSON.stringify(newList);
  const options = makeOptions(body, "POST", null);
  const list = await response.json();
  const response = await fetch(`${BASE_URI}/${BASE_LIST}`, options);
  console.log(list);
  dispatch(createListSuccess(list));
};

export const createBoard = newBoard => async dispatch => {
  dispatch(startAwaitBoard());
  const body = JSON.stringify(newBoard);
  const options = makeOptions(body, "POST", localStorage.getItem("token"));
  try {
    const response = await fetch(`${BASE_URI}/${BASE_BOARD}`, options);
    if (response.status === 400 || response.status === 401)
      return dispatch(createBoardFailure("Bad request"));
    const board = await response.json();
    dispatch(createBoardSuccess(board));
  } catch (err) {
    dispatch(createBoardFailure(err.message));
  }
};

export const getAuthenticatedUser = token => async dispatch => {
  dispatch(startAwaitLogin());
  const options = makeOptions("", "GET", localStorage.getItem("token"));
  try {
    const response = await fetch(`${BASE_URI}/${BASE_USER}`, options);
    if (response.status === 400) {
      dispatch(loginFailure("Something went wrong"));
    }
    const user = await response.json();
    dispatch(loginSuccess(user));
    dispatch(populateBoards(user.boards));
  } catch (err) {
    dispatch(loginFailure("something went wrong"));
  }
};

export const login = credentials => async dispatch => {
  dispatch(startAwaitLogin());
  const options = makeOptions(JSON.stringify(credentials), "POST", null);
  try {
    const response = await fetch(`${BASE_URI}/${BASE_LOGIN}`, options);
    const user = await response.json();
    if (response.status === 401)
      return dispatch(loginFailure("Invalid credentials, please try again"));
    localStorage.setItem("token", user.token);
    dispatch(loginSuccess(user));
    dispatch(populateBoards(user.boards));
  } catch (err) {
    dispatch(loginFailure("Something went wrong, please try again"));
  }
};
