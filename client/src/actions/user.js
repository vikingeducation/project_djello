export const REQUEST_CHECK_USER = "REQUEST CHECK USER";
export const SUCCESS_CHECK_USER = "SUCCESS CHECK USER";
export const LOGIN_USER = "LOG IN USER";
export const LOGOUT_USER = "LOG OUT USER";
export const FAILURE_CHECK_USER = "FAILURE CHECK USER";
export const DJELLO_SESSION_USERNAME = "DJELLO_SESSION_USERNAME";
export const DJELLO_SESSION_ACCESSTOKEN = "DJELLO_SESSION_ACCESSTOKEN";
const requestCheckUser = user => {
  return {
    type: REQUEST_CHECK_USER,
    data: null
  };
};

const loginUser = () => {
  return {
    type: LOGIN_USER,
    data: null
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    data: null
  };
};
const successCheckUser = user => {
  return {
    type: SUCCESS_CHECK_USER,
    data: user
  };
};
const failureCheckUser = err => {
  return {
    type: FAILURE_CHECK_USER,
    data: err
  };
};
//CREATE A NEW USER
//TODO: IMPLEMENT THIS
export const registerUser = userInfo => async dispatch => {
  // dispatch(requestCheckUser(user));
  try {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    const user = {
      username: userInfo.username,
      password: userInfo.password
    };
    const json = JSON.stringify(user);
    const apiData = await fetch(`/users`, {
      headers,
      method: "POST",
      body: json
    });

    if (apiData && apiData.status === 200) {
      const data = await apiData.json();
      console.log("user found, = ", data);
      //create the localSession with the token given

      //manipulate some info if need be
      const user = data;
      // console.log("user = ", user);
      dispatch(successCheckUser(user));
      dispatch(loginUser());
    } else {
      console.log("user not found");
      dispatch(failureCheckUser(user));
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};
//LOGIN A USER
export const validateUser = user => async dispatch => {
  dispatch(requestCheckUser(user));
  try {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    const json = JSON.stringify(user);
    const apiData = await fetch(`/sessions`, {
      headers,
      method: "POST",
      body: json
    });

    if (apiData && apiData.status === 200) {
      const data = await apiData.json();
      console.log("user found, = ", data);
      //create the localSession with the token given
      localStorage.setItem(DJELLO_SESSION_USERNAME, data.username);
      localStorage.setItem(DJELLO_SESSION_ACCESSTOKEN, data.accessToken);
      //ship user info off to the redux store
      const user = data;
      dispatch(successCheckUser(user));
      dispatch(loginUser());
    } else {
      console.log("user not found");
      dispatch(failureCheckUser(user));
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};

//Use existing sessionData to login the user
export const getSession = sessionData => async dispatch => {
  let user;
  console.log("sessionData = ", sessionData.accessToken, sessionData.username);
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    const apiData = await fetch(`/sessions/login`, {
      headers,
      method: "POST",
      body: JSON.stringify(sessionData)
    });

    if (apiData && apiData.status === 200) {
      const data = await apiData.json();
      console.log("user found, = ", data);
      //set the localSession in case the server sent a fresh token
      localStorage.setItem(DJELLO_SESSION_USERNAME, data.username);
      localStorage.setItem(DJELLO_SESSION_ACCESSTOKEN, data.accessToken);
      //ship the user off to the redux store
      user = { username: data.username };
      dispatch(successCheckUser(user));
      dispatch(loginUser());
    } else {
      console.log("user not found");
      dispatch(failureCheckUser(user));
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};
//LOGOUT A USER, (basically wipe this device of info)
export const logout = user => async dispatch => {
  //clean out the local storage session data
  localStorage.removeItem(DJELLO_SESSION_USERNAME);
  localStorage.removeItem(DJELLO_SESSION_ACCESSTOKEN);
  //logout the redux store data
  //??? mayhaps change this to destroy all the store data ?
  dispatch(logoutUser());
  //if the server needs it send a delete session request
  //need I DELETE /session/id ??
};
