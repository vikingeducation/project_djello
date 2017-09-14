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

const logoutUser = () => {
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

const validateUser = user => async dispatch => {
  dispatch(requestCheckUser(user));
  try {
    const apiData = await fetch(`/users/${user.username}`);
    if (apiData && apiData.status == 200) {
      //set user
      console.log("user found");
      const data = await apiData.json();
      const user = {
        username: data.username
      };
      console.log("user = ", user);
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
export default validateUser;
