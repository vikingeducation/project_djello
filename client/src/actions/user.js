export const REQUEST_CHECK_USER = "REQUEST CHECK USER";
export const SUCCESS_CHECK_USER = "SUCCESS CHECK USER";
export const LOGIN_USER = "LOG IN USER";
export const LOGOUT_USER = "LOG OUT USER";
export const FAILURE_CHECK_USER = "FAILURE CHECK USER";

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

export const validateUser = user => async dispatch => {
  dispatch(requestCheckUser(user));
  try {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    const json = JSON.stringify(user);
    const apiData = await fetch(`/users/${user.username}`, {
      headers,
      method: "POST",
      body: json
    });

    if (apiData && apiData.status == 200) {
      const data = await apiData.json();
      // console.log("user found, = ", data);
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
// export default validateUser;
