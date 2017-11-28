export const SET_COOKIE = "SET_COOKIE";
export const SET_USERS = "SET_USERS";
export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
export const GET_REQUEST = "GET_REQUEST";
export const GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE";

export function setCookie(data) {
  return {
    type: SET_COOKIE,
    data
  };
}

export function setUsers(data) {
  return {
    type: SET_USERS,
    data
  };
}

export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function getRequestSuccess(data) {
  return {
    type: GET_REQUEST_SUCCESS,
    data
  };
}

export function getRequestFailure(error) {
  return {
    type: GET_REQUEST_FAILURE,
    error
  };
}

export function getUsers() {
  return dispatch => {
    console.log("Requesting Users");
    dispatch(getRequest());
    fetch("/users")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
        }
        return response.json();
      })
      .then(json => {
        dispatch(setUsers(json.data));
      })
      .catch(error => {
        dispatch(getRequestFailure(error));
      });
  };
}
