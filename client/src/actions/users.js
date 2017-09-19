import {
  BASE_URL,
  USERS_REQUEST,
  USERS_GET_SUCCESS,
  USERS_GET_FAILURE
} from "./constants";

export const usersRequest = () => ({
  type: USERS_REQUEST
});

export const usersGetSuccess = data => ({
  type: USERS_GET_SUCCESS,
  data
});

export const usersGetFailure = error => ({
  type: USERS_GET_FAILURE
});

export const usersGet = () => async dispatch => {
  dispatch(usersRequest());
  let url = `${BASE_URL}/users`;
  let result;

  try {
    result = await fetch(url);
    result = await result.json();
    dispatch(usersGetSuccess(result));
  } catch (err) {
    dispatch(usersGetFailure(err));
  }
};
