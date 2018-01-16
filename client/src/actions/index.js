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
      .then(res => dispatch(userAllResults(JSON.stringify(res.data))))
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
      .then(res => dispatch(userOneResults(JSON.stringify(res.data))))
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
      .then(res => dispatch(loginResults(JSON.stringify(res.data))))
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
      .then(res => dispatch(userAddResults(JSON.stringify(res.data))))
      .catch(err => dispatch(userAddError(err)));
  };
};

export const BOARD_ALL_START = "BOARD_ALL_START";
export const boardAllStart = () => {
  return { type: BOARD_ALL_START };
};
export const BOARD_ALL_RESULTS = "BOARD_ALL_RESULTS";
export const boardAllResults = data => {
  return { type: BOARD_ALL_RESULTS, data };
};
export const BOARD_ALL_ERROR = "BOARD_ALL_ERROR";
export const boardAllError = data => {
  return { type: BOARD_ALL_ERROR, data };
};

export const BOARD_ALL = "BOARD_ALL";
export const boardAll = () => {
  return dispatch => {
    dispatch(boardAllStart());
    axios
      .get(`http://localhost:3000/api/boards`)
      .then(res => dispatch(boardAllResults(JSON.stringify(res.data))))
      .catch(err => dispatch(boardAllError(err)));
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
export const boardDelete = id => {
  return dispatch => {
    dispatch(boardDeleteStart());
    axios
      .delete(`http://localhost:3000/api/boards/${id}`, {
        //headers: { "Content-Type": "application/json" }
      })
      .then(res => dispatch(boardDeleteResults(JSON.stringify(res.data))))
      .catch(err => dispatch(boardDeleteError(err)));
  };
};

export const BOARD_USER_START = "BOARD_USER_START";
export const boardUserStart = () => {
  return { type: BOARD_USER_START };
};
export const BOARD_USER_RESULTS = "BOARD_USER_RESULTS";
export const boardUserResults = data => {
  return { type: BOARD_USER_RESULTS, data };
};
export const BOARD_USER_ERROR = "BOARD_USER_ERROR";
export const boardUserError = data => {
  return { type: BOARD_USER_ERROR, data };
};

export const BOARD_USER = "BOARD_USER";
export const boardUser = id => {
  return dispatch => {
    dispatch(boardUserStart());
    axios
      .get(`http://localhost:3000/api/users/${id}`)
      .then(res => dispatch(boardUserResults(JSON.stringify(res.data))))
      .catch(err => dispatch(boardUserError(err)));
  };
};
