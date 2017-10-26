import * as Actions from './actionTypes'

import { baseURL } from '../helpers/actionHelpers'

export function getBoardRequest() {
  return { type: Actions.GET_BOARD_REQUEST }
}

export function getBoardFailure(data) {
  return { data, type: Actions.GET_BOARD_FAILURE }
}

export function getBoardSuccess(data) {
  return { data, type: Actions.GET_BOARD_SUCCESS }
}

export function updateBoardRequest() {
  return { type: Actions.UPDATE_BOARD_REQUEST }
}

export function updateBoardFailure(data) {
  return { data, type: Actions.UPDATE_BOARD_FAILURE }
}

export function updateBoardSuccess(data) {
  return { data, type: Actions.UPDATE_BOARD_SUCCESS }
}
export function deleteBoardRequest() {
  return { type: Actions.DELETE_BOARD_REQUEST }
}

export function deleteBoardFailure(data) {
  return { data, type: Actions.DELETE_BOARD_FAILURE }
}

export function deleteBoardSuccess(data) {
  return { data, type: Actions.DELETE_BOARD_SUCCESS }
}

export function loadDefaultBoard() {
  return (dispatch, getState) => {
    const token = getState().auth.token
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      method: 'GET'
    }

    dispatch(getBoardRequest())

    return fetch(`${baseURL}/main`, options)
      .then(response => {
        if (!response.ok) {
          console.log('response not ok', response)
          throw response
        }
        return response.json()
      }).then(json => {
        console.log('success', json)
        dispatch(getBoardSuccess(json))
      }).catch(error => {
        dispatch(getBoardFailure(error.status))
        console.log('error', error)
      })
  }
}

export function updateBoard(data, board_id) {
  return (dispatch, getState) => {
    const token = getState().auth.token
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    }

    dispatch(updateBoardRequest())

    return fetch(`${baseURL}/boards/${board_id}`, options).then(response => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    }).then(json => {
      dispatch(updateBoardSuccess(json))
      console.log('response ok', json)
    }).catch(error => {
      dispatch(updateBoardFailure(error))
      console.log('response no ok', error.status)
    })
  }
}