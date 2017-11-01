import * as Actions from '../actions/actionTypes'
import { baseURL, setOptions, arrayToObjectByID } from '../helpers/actionHelpers'

export function createCardRequest() {
  return { type: Actions.CREATE_CARD_REQUEST }
}

export function createCardFailure(data) {
  return { data, type: Actions.CREATE_CARD_FAILURE }
}

export function createCardSuccess(data) {
  return { data, type: Actions.CREATE_CARD_SUCCESS }
}

export function getCardRequest() {
  return { type: Actions.GET_CARD_REQUEST }
}

export function getCardFailure(data) {
  return { data, type: Actions.GET_CARD_FAILURE }
}

export function getCardSuccess(data) {
  return { data, type: Actions.GET_CARD_SUCCESS }
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

export function loadCard(card_id) {
  console.log('loadCard form cardActions')
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'GET')

    dispatch(getCardRequest())

    return fetch(`${baseURL}/cards/${card_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(response)
        }
        return response.json()
      }).then(json => {
        console.log('json', arrayToObjectByID([json]))
        const massaged = arrayToObjectByID([json])
        dispatch(getCardSuccess(massaged))
      }).catch(error => {
        console.log('error', error)
        dispatch(getCardFailure(error))
      })
  }
}