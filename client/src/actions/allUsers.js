export const GET_ALL_USERS_REQUEST = "GET_ALL_USERS_REQUEST";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";
export const GET_ALL_USERS_FAILURE = "GET_ALL_USERS_FAILURE";

export function getAllUsersRequest() {
  return {
    type: GET_ALL_USERS_REQUEST
  };
}

export function getAllUsersSuccess(data) {
  return {
    type: GET_ALL_USERS_SUCCESS,
    data
  };
}

export function getAllUsersFailure(error) {
  return {
    type: GET_ALL_USERS_FAILURE,
    error
  };
}

export function getAllUsers(token) {
  let config = {
    method: "GET",
    headers: { Authorization: "Bearer " + token }
  };

  return dispatch => {
    dispatch(getAllUsersRequest());

    fetch(`api/v1/users`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        let users = json.data.map(user => {
          return {
            id: user._id,
            email: user.email
          };
        });
        dispatch(getAllUsersSuccess(users));
      })
      .catch(error => {
        dispatch(getAllUsersFailure(error));
      });
  };
}
