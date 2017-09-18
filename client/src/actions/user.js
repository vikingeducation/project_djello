import Cookies from "universal-cookie";

import {
  BASE_URL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from "./constants";

const cookies = new Cookies();

export const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST
});

export const userLoginSuccess = data => {
  console.log("made it here");
  cookies.set("token", data.token, { path: "/" });
  return {
    type: USER_LOGIN_SUCCESS,
    data
  };
};

export const userLoginFailure = error => ({
  type: USER_LOGIN_FAILURE
});

export const userLogin = userData => async dispatch => {
  dispatch(userLoginRequest());
  let url = `${BASE_URL}/users/login`;
  let result;

  try {
    result = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(userData)
    });
    result = await result.json();
    dispatch(userLoginSuccess(result));
  } catch (err) {
    dispatch(userLoginFailure(err));
  }
};
