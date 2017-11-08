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

export function updateCardRequest() {
  return { type: Actions.UPDATE_CARD_REQUEST }
}

export function updateCardFailure(data) {
  return { data, type: Actions.UPDATE_CARD_FAILURE }
}

export function updateCardSuccess(data) {
  return { data, type: Actions.UPDATE_CARD_SUCCESS }
}

export function deleteCardMemberSuccess(data) {
  return { data, type: Actions.DELETE_CARD_MEMBER_SUCCESS }
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

export function removeCardMember(card_id, user_id) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'DELETE')
    dispatch(updateCardRequest())

    return fetch(`${baseURL}/cards/${card_id}/memberships/${user_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(response)
        }
      })
      .then(() => {
        dispatch(deleteCardMemberSuccess({
          card_id: card_id,
          member_id: user_id
        }))
      })
      .catch(error => {
        dispatch(updateCardFailure(error))
      })
  }
}

export function updateCard(data, card_id) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'PUT', data)
    dispatch(updateCardRequest())

    return fetch(`${baseURL}/cards/${card_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(response)
        }
        return response.json()
      }).then(json => {
        const massaged = arrayToObjectByID([json])
        dispatch(updateCardSuccess(massaged))
      }).catch(error => {
        dispatch(updateCardFailure(error))
      })
  }
}

export function loadCard(card_id) {
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
        const massaged = arrayToObjectByID([json])
        dispatch(getCardSuccess(massaged))
      }).catch(error => {
        dispatch(getCardFailure(error))
      })
  }
}