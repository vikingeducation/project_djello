import * as Types from './actionTypes'
import { baseURL } from '../helpers/actionHelpers'


export function loginRequest() {
  return { type: Types.LOGIN_REQUEST }
}

export function loginFailure(data) {
  return { data, type: Types.LOGIN_FAILURE }
}

export function loginSuccess(data) {
  return { data, type: Types.LOGIN_SUCCESS }
}

export function loginFormErrors(data) {
  return { data, type: Types.LOGIN_FORM_ERRORS }
}

export function logoutUser() {
  return { type: Types.LOGOUT_USER }
}

export function login(data) {

  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auth: data })
    }

    return fetch(`${baseURL}/login`, options).
    then(response => {
      if (!response.ok) {
        throw Error(response.status)
      }
      return response.json()
    }).then(json => {
      console.log('token', json.jwt)
      dispatch(loginSuccess(json.jwt))
      return json.jwt
    }).catch(error => {
      dispatch(loginFailure(error.status))
    })
  }

}