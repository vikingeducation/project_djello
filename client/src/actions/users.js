export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_FAILURE = "GET_USERS_FAILURE";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";

export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data
  };
}

export function getUsersFailure(error) {
  return {
    type: GET_USERS_FAILURE,
    error
  };
}

export function getUsersRequest() {
  return {
    type: GET_USERS_REQUEST
  };
}

export function getUsers() {
  return dispatch => {
    dispatch(getUsersRequest());
    fetch(`users?token=${localStorage.getItem("token")}`)
      .then(checkStatus)
      .then(json => {
        dispatch(getUsersSuccess(json));
      })
      .catch(error => {
        dispatch(getUsersFailure(error.message + error.response));
      });
  };
}
function checkStatus(response) {
  // If response not okay, throw an error
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response.json();
}
