import { SET_LISTS } from "./constents/types";
import { database } from "./constents/database";

import { getRequest, getRequestSuccess, getRequestFailure } from "./Requests";

export function setLists(data) {
  return {
    type: SET_LISTS,
    data
  };
}

export function deleteList(listName, boardName) {
  return dispatch => {
    dispatch(getRequest());
    fetch(`${database}/remove/list/${listName}`).then(() => {
      dispatch(getRequestSuccess());
      dispatch(getLists(boardName));
    });
  };
}

export function changeList(oldName, newName, newDescription, boardName) {
  return dispatch => {
    dispatch(getRequest());
    fetch(`${database}/change/list`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        oldName: oldName,
        newName: newName,
        description: newDescription
      })
    }).then(() => {
      dispatch(getRequestSuccess());
      dispatch(getLists(boardName));
    });
  };
}

export function getLists(boardName) {
  return dispatch => {
    dispatch(getRequest());
    fetch(`${database}/lists/${boardName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error with api`);
        }
        return response.json();
      })
      .then(json => {
        dispatch(setLists(json.data));
      })
      .catch(error => {
        dispatch(getRequestFailure(error));
      });
  };
}
