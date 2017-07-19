export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

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


export function loginUser(creds) {
    let config = {
      method: 'POST',
      headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      body: `email=${creds.email}&password=${creds.password}`
    };
  
    return dispatch => {
      // We dispatch requestLogin to kickoff the call to the API
      dispatch(requestLogin(creds))
  
      return fetch('http://localhost:3001/sessions/create', config)
        .then(response =>
          response.json().then(user => ({ user, response }))
              ).then(({ user, response }) =>  {
          if (!response.ok) {
            // If there was a problem, we want to
            // dispatch the error condition
            dispatch(loginError(user.message))
            return Promise.reject(user)
          } else {
            // If login was successful, set the token in local storage
            localStorage.setItem('id_token', user.id_token)
            localStorage.setItem('id_token', user.access_token)
            // Dispatch the success action
            dispatch(receiveLogin(user))
          }
        }).catch(err => console.log("Error: ", err))
    }
  }