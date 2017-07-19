export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT';

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

export function logout() {
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
      dispatch(loginRequest())
  
      fetch(`sessions`, config)
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
          }

          return response.json();
        })
        .then(json => {
          dispatch(loginSuccess(json.token));
        })
        .catch(error => {
          dispatch(loginFailure(error));
        });
    }
  }