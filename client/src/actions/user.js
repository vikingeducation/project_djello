export const REQUEST_CHECK_USER = "REQUEST CHECK USER";
export const SUCCESS_CHECK_USER = "SUCCESS CHECK USER";
export const LOGIN_USER = "LOG IN USER";
export const LOGOUT_USER = "LOG OUT USER";
export const FAILURE_CHECK_USER = "FAILURE CHECK USER";
export const DJELLO_SESSION = "DJELLO_SESSION";

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
//TODO: IMPLEMENT THIS
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

      //manipulate some info if need be
      const user = data;
      const sessionData = {
        accessToken: data.accessToken,
        username: data.username
      };
      localStorage.setItem(DJELLO_SESSION, sessionData);
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
  try {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    const apiData = await fetch(`/sessions/login`, {
      headers,
      method: "POST",
      body: JSON.stringify({ accessToken: "DankMemez", username: "a" })
    });

    if (apiData && apiData.status === 200) {
      const data = await apiData.json();
      console.log("user found, = ", data);
      //create the localSession with the token given

      //manipulate some info if need be
      user = data;
      const sessionData = {
        accessToken: data.accessToken,
        username: data.username
      };
      localStorage.setItem(DJELLO_SESSION, sessionData);
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
//LOGOUT A USER
export const logout = user => async dispatch => {
  localStorage.removeItem("DJELLO_ACCESS_TOKEN");
  dispatch(logoutUser());
  //need I DELETE /session/id ??
};
