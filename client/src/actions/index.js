import axios from "axios";

export const USER_ALL_START = "USER_ALL_START";
export const userAllStart = () => {
  return { type: USER_ALL_START };
};

export const USER_ALL_RESULTS = "USER_ALL_RESULTS";
export const userAllResults = data => {
  return { type: USER_ALL_RESULTS, data };
};

export const USER_ALL_ERROR = "USER_ALL_ERROR";
export const userAllError = data => {
  return { type: USER_ALL_ERROR, data };
};

export const USER_ALL = "USER_ALL";
export const userAll = () => {
  return dispatch => {
    dispatch(userAllStart());
    axios
      .get(`http://localhost:3000/api/users`)
      .then(res => dispatch(userAllResults(res.data)))
      .catch(err => dispatch(userAllError(err)));
  };
};

export const USER_ONE_START = "USER_ONE_START";
export const userOneStart = () => {
  return { type: USER_ONE_START };
};

export const USER_ONE_RESULTS = "USER_ONE_RESULTS";
export const userOneResults = data => {
  return { type: USER_ONE_RESULTS, data };
};

export const USER_ONE_ERROR = "USER_ONE_ERROR";
export const userOneError = data => {
  return { type: USER_ONE_ERROR, data };
};

export const USER_ONE = "USER_ONE";
export const userOne = id => {
  return dispatch => {
    dispatch(userOneStart());
    axios
      .get(`http://localhost:3000/api/users/${id}`)
      .then(res => dispatch(userOneResults(res.data)))
      .catch(err => dispatch(userOneError(err)));
  };
};

export const LOGIN_START = "LOGIN_START";
export const loginStart = () => {
  return { type: LOGIN_START };
};

export const LOGIN_RESULTS = "LOGIN_RESULTS";
export const loginResults = data => {
  return { type: LOGIN_RESULTS, data };
};

export const LOGIN_ERROR = "LOGIN_ERROR";
export const loginError = data => {
  return { type: LOGIN_ERROR, data };
};

export const LOGIN = "LOGIN";
export const login = data => {
  return dispatch => {
    dispatch(loginStart());
    axios
      .post(`http://localhost:3000/api/login`, {
        email: data.email,
        password: data.password
      })
      .then(res => dispatch(loginResults(res.data)))
      .catch(err => dispatch(loginError(err)));
  };
};

export const USER_ADD_START = "USER_ADD_START";
export const userAddStart = () => {
  return { type: USER_ADD_START };
};

export const USER_ADD_RESULTS = "USER_ADD_RESULTS";
export const userAddResults = data => {
  return { type: USER_ADD_RESULTS, data };
};

export const USER_ADD_ERROR = "USER_ADD_ERROR";
export const userAddError = data => {
  return { type: USER_ADD_ERROR, data };
};

export const USER_ADD = "USER_ADD";
export const userAdd = data => {
  return dispatch => {
    dispatch(userAddStart());
    axios
      .post(`http://localhost:3000/api/users/`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })
      .then(res => dispatch(userAddResults(res.data)))
      .catch(err => dispatch(userAddError(err)));
  };
};

export const BOARD_DELETE_START = "BOARD_DELETE_START";
export const boardDeleteStart = () => {
  return { type: BOARD_DELETE_START };
};
export const BOARD_DELETE_RESULTS = "BOARD_DELETE_RESULTS";
export const boardDeleteResults = data => {
  return { type: BOARD_DELETE_RESULTS, data };
};
export const BOARD_DELETE_ERROR = "BOARD_DELETE_ERROR";
export const boardDeleteError = data => {
  return { type: BOARD_DELETE_ERROR, data };
};

export const BOARD_DELETE = "BOARD_DELETE";
export const boardDelete = (boardId, userId) => {
  return dispatch => {
    dispatch(boardDeleteStart());
    axios
      .delete(`http://localhost:3000/api/boards/${boardId}`)
      .then(res => dispatch(userOne(userId)))
      .catch(err => dispatch(boardDeleteError(err)));
  };
};

export const BOARD_CREATE_START = "BOARD_CREATE_START";
export const boardCreateStart = () => {
  return { type: BOARD_CREATE_START };
};
export const BOARD_CREATE_RESULTS = "BOARD_CREATE_RESULTS";
export const boardCreateResults = data => {
  return { type: BOARD_CREATE_RESULTS, data };
};
export const BOARD_CREATE_ERROR = "BOARD_CREATE_ERROR";
export const boardCreateError = data => {
  return { type: BOARD_CREATE_ERROR, data };
};

export const BOARD_CREATE = "BOARD_CREATE";
export const boardCreate = data => {
  return dispatch => {
    dispatch(boardCreateStart());
    axios
      .post(`http://localhost:3000/api/boards/new`, {
        boardName: data.name,
        id: data.userId
      })
      .then(res => dispatch(boardCreateResults(res.data)))
      .catch(err => dispatch(boardCreateError(err)));
  };
};

export const LIST_SHOW_START = "LIST_SHOW_START";
export const listShowStart = () => {
  return { type: LIST_SHOW_START };
};

export const LIST_SHOW_RESULTS = "LIST_SHOW_RESULTS";
export const listShowResults = data => {
  return { type: LIST_SHOW_RESULTS, data };
};

export const LIST_SHOW_ERROR = "LIST_SHOW_ERROR";
export const listShowError = data => {
  return { type: LIST_SHOW_ERROR, data };
};

export const LIST_SHOW = "LIST_SHOW";
export const listShow = id => {
  return dispatch => {
    dispatch(listShowStart());
    axios
      .get(`http://localhost:3000/api/lists/${id}`)
      .then(res => dispatch(listShowResults(res.data)))
      .catch(err => dispatch(listShowError(err)));
  };
};

export const LIST_CREATE_START = "LIST_CREATE_START";
export const listCreateStart = () => {
  return { type: LIST_CREATE_START };
};

export const LIST_CREATE_RESULTS = "LIST_CREATE_RESULTS";
export const listCreateResults = data => {
  return { type: LIST_CREATE_RESULTS, data };
};

export const LIST_CREATE_ERROR = "LIST_CREATE_ERROR";
export const listCreateError = data => {
  return { type: LIST_CREATE_ERROR, data };
};

export const LIST_CREATE = "LIST_CREATE";
export const listCreate = data => {
  return dispatch => {
    dispatch(listCreateStart());
    axios
      .post(`http://localhost:3000/api/lists/`, {
        listName: data.name,
        id: data.boardId
      })
      .then(res => dispatch(listCreateResults(res.data)))
      .catch(err => dispatch(listCreateError(err)));
  };
};

export const CARD_CREATE_START = "CARD_CREATE_START";
export const cardCreateStart = () => {
  return { type: CARD_CREATE_START };
};

export const CARD_CREATE_RESULTS = "CARD_CREATE_RESULTS";
export const cardCreateResults = data => {
  return { type: CARD_CREATE_RESULTS, data };
};

export const CARD_CREATE_ERROR = "CARD_CREATE_ERROR";
export const cardCreateError = data => {
  return { type: CARD_CREATE_ERROR, data };
};

export const CARD_CREATE = "CARD_CREATE";
export const cardCreate = data => {
  return dispatch => {
    dispatch(cardCreateStart());
    axios
      .post(`http://localhost:3000/api/cards`, {
        cardName: data.name,
        cardBody: data.cardBody,
        id: data.listId
      })
      .then(res => dispatch(cardCreateResults(res.data)))
      .catch(err => dispatch(cardCreateError(err)));
  };
};
