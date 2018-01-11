export const GET_REQUEST = "GET_REQUEST";
export const GET_SUCCESS = "GET_SUCCESS";
export const GET_FAILURE = "GET_FAILURE";

export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function getSuccess(data) {
  return {
    type: GET_SUCCESS,
    data: data
  };
}

export function getFailure(error) {
  return {
    type: GET_FAILURE,
    error: error
  };
}

export function createUser() {
  return dispatch => {
    dispatch(getRequest());
    fetch(`https://localhost:3000/api/users/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response}`);
        }
        return response.json();
      })
      .then(response => {
        console.log("response => ", response);
        dispatch(getSuccess(response));
      })
      .catch(e => {
        dispatch(getFailure(e));
      });
  };
}
