const BASE_LOGIN_API = "api/login";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const START_AWAIT_LOGIN = "START_AWAIT_LOGIN";
export const LOG_OUT = "LOG_OUT";

export const startAwaitLogin = () => {
  return {
    type: START_AWAIT_LOGIN
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

export const logOut = () => {
  return {
    type: LOG_OUT
  };
};

export const login = credentials => async dispatch => {
  dispatch(startAwaitLogin());
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const options = {
    headers,
    method: "POST",
    body: JSON.stringify(credentials)
  };
  try {
    const response = await fetch(BASE_LOGIN_API, options);
    if (response.status === 401)
      return dispatch(loginFailure("You screwed up"));
    const user = await response.json();
    dispatch(loginSuccess(user));
  } catch (err) {
    dispatch(loginFailure("Something went wrong, please try again"));
  }
};
