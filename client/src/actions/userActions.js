import * as Actions from './actionTypes'

const baseURL = 'http://localhost:3000'

export function getUserRequest() {
  return {
    type: Actions.GET_USER_REQUEST
  }
}

export function getUserSuccess(data) {
  return {
    type: Actions.GET_USER_SUCCESS,
    data
  }
}

export function getUserFailure(data) {
  return {
    type: Actions.GET_USER_FAILURE,
    data
  }
}

export function getUser() {

  return (dispatch, getState) => {

    const token = getState().auth.token

    const options = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      method: 'GET'
    }

    return fetch(`${baseURL}/users`, options)
      .then(response => {
        if (!response.ok) {
          console.log('response not ok', response)
          throw response
        }
        return response.json()
      }).then(json => {
        dispatch(getUserSuccess(json))
      }).catch(error => {
        dispatch(getUserFailure(error))
      })
      // grab token from state
  }

}