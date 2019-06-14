import { SET_CURRENT_BOARD, SET_BOARDS } from "./constents/types";
import { database } from "./constents/database";

import { getRequest, getRequestSuccess, getRequestFailure } from "./Requests";

export function setBoards(data) {
  return {
    type: SET_BOARDS,
    data
  };
}

export function setCurrentBoard(data) {
  return {
    type: SET_CURRENT_BOARD,
    data
  };
}

export function deleteBoard(boardName) {
  return dispatch => {
    dispatch(getRequest());
    fetch(`${database}/remove/board/${boardName}`).then(() => {
      dispatch(getRequestSuccess());
      dispatch(getBoards());
    });
  };
}

export function changeBoard(oldName, newName) {
  return dispatch => {
    dispatch(getRequest());
    fetch(`${database}/change/board`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ oldName: oldName, newName: newName })
    }).then(() => {
      dispatch(getRequestSuccess());
      dispatch(getBoards());
    });
  };
}

export function getBoards() {
  return dispatch => {
    dispatch(getRequest());
    fetch(`${database}/boards`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error with api`);
        }
        return response.json();
      })
      .then(json => {
        dispatch(setBoards(json.data));
      })
      .catch(error => {
        dispatch(getRequestFailure(error));
      });
  };
}
