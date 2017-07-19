export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT';

export function getLoginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function getLoginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data
  };
}

export function getLoginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

export function logoutUser() {
  return {
    type: LOGOUT
  }
}


export function loginUser(creds) {
    let config = {
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      body: `email=${creds.email}&password=${creds.password}`
    };
  
    return dispatch => {
      dispatch(getLoginRequest())
  
      fetch(`sessions`, config)
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
          }

          return response.json();
        })
        .then(json => {
          dispatch(getLoginSuccess(json.token));
        })
        .catch(error => {
          console.log(error);
          dispatch(getLoginFailure(error));
        });
    }
  }