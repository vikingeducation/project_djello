import * as Actions from './actionTypes'
import { setOptions, baseURL, arrayToObjectByID } from '../helpers/actionHelpers'

export function updateListRequest() {
  return { type: Actions.UPDATE_LIST_REQUEST }
}

export function updateListFailure(data) {
  return { data, type: Actions.UPDATE_LIST_FAILURE }
}

export function updateListSuccess(data) {
  return { data, type: Actions.UPDATE_LIST_SUCCESS }
}

export function updateList(data, list_id) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'PUT', data)

    dispatch(updateListRequest())

    return fetch(`${baseURL}/lists/${list_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(response)
        }
        return response.json()
      })
      .then(json => {
        dispatch(updateListSuccess(json.lists))
      })
      .catch(error => {
        dispatch(updateListFailure(error))
      })
  }
}