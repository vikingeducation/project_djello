export const REQUEST_CHECK_USER = "REQUEST CHECK USER";
export const SUCCESS_CHECK_USER = "SUCCESS CHECK USER";
export const FAILURE_CHECK_USER = "FAILURE CHECK USER";

const requestCheckUser = user => {
  return {
    type: REQUEST_CHECK_USER,
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
  const isValid = await fetch("/user/");
  if (isValid) {
    //redirect
    //set user
    console.log("user found");
    dispatch(successCheckUser(user));
  } else {
    console.log("user not found");
    dispatch(failureCheckUser(user));
  }
};
export default validateUser;
