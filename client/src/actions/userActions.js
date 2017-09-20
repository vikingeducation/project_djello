export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export function getUserRequest() {
  return {
    type: GET_USER_REQUEST
  };
}

export function getUserSuccess(data) {
  return {
    type: GET_USER_SUCCESS,
    payload: data
  };
}

export function getUserFailure(error) {
  return {
    type: GET_USER_FAILURE,
    error: error
  };
}

export function getUser(userId) {

  return (dispatch) => {
    dispatch(getUserRequest());
    fetch(`http://localhost:3001/api/v1/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(json => {
        dispatch(getUserSuccess(json));
      })
      .catch(error => {
        dispatch(getUserFailure(error));
      });
  };
}