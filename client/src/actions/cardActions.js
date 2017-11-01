import * as Actions from '../actions/actionTypes'
import { baseURL, setOptions } from '../helpers/actionHelpers'

export function createCardRequest() {
  return { type: Actions.CREATE_CARD_REQUEST }
}

export function createCardFailure(data) {
  return { data, type: Actions.CREATE_CARD_FAILURE }
}

export function createCardSuccess(data) {
  return { data, type: Actions.CREATE_CARD_SUCCESS }
}

export function createCard(data, list_id) {
  return (dispatch, getState) => {

    const options = setOptions(getState(), 'POST', { card: data })

    dispatch(createCardRequest())

    return fetch(`${baseURL}/lists/${list_id}/cards`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(response)
        }
        return response.json()
      }).then(json => {
        dispatch(createCardSuccess(json))
      }).catch(error => {
        dispatch(createCardFailure(error))
      })
  }
}