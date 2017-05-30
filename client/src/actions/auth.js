// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

//change fetch url for development or production

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
    userEmail: user.userEmail,
    userId: user.userId
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}
// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${creds.email}&password=${creds.password}`
  };

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch("https://djello-server.herokuapp.com/sessions/create", config)
      .then(response => {
        if (!response.ok) {
          const error = new Error(response.statusText);
          error.response = response;
          console.log(error);
          throw error;
        }
        return response.json();
      })
      .then(user => {
        if (user) {
          console.log(user);
          // If login was successful, set the token in local storage
          localStorage.setItem("token", user.token);
          localStorage.setItem("userEmail", user.userEmail);
          localStorage.setItem("userId", user.userId);
          // Dispatch the success action
          dispatch(receiveLogin(user));
        }
      })
      .catch(error => dispatch(loginError(error.message)));
  };
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    dispatch(receiveLogout());
  };
}
