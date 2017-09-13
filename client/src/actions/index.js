const BASE_LOGIN_API = "api/users";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const START_AWAIT_LOGIN = "START_AWAIT_LOGIN";

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
    const user = await response.json();
    dispatch(loginSuccess(user));
  } catch (err) {
    dispatch(loginFailure("Your information was incorrect. Please try again"));
  }
};
