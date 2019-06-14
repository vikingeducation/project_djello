import { SET_CARDS } from "./constents/types";
import { database } from "./constents/database";

import { getRequest, getRequestSuccess, getRequestFailure } from "./Requests";

export function setCards(data, listName) {
  return {
    type: SET_CARDS,
    data: data,
    listName: listName
  };
}

export function deleteCard(cardName, listName, userName) {
  return dispatch => {
    dispatch(getRequest());
    fetch(`${database}/remove/card/${cardName}`).then(() => {
      dispatch(getRequestSuccess());
      dispatch(getCards(listName, userName));
    });
  };
}

export function changeCard(
  oldName,
  newName,
  newDescription,
  newMembers,
  listName,
  username
) {
  return dispatch => {
    dispatch(getRequest());
    newMembers.join(`:`);
    fetch(`${database}/change/card`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        oldName: oldName,
        newName: newName,
        description: newDescription,
        members: newMembers,
        user: username
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error with api`);
        }
        return true;
      })
      .then(response => {
        dispatch(getRequestSuccess());
        dispatch(getCards(listName, username));
      })
      .catch(e => {
        dispatch(getRequestFailure({ error: e }));
      });
  };
}

export function getCards(listName, username) {
  return dispatch => {
    dispatch(getRequest());
    fetch(`${database}/cards/${listName}/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error with api`);
        }
        return response.json();
      })
      .then(json => {
        dispatch(setCards(json.data, listName));
      })
      .catch(error => {
        dispatch(getRequestFailure(error));
      });
  };
}

export function markComplete(title, complete, username, listName) {
  return dispatch => {
    dispatch(getRequest());

    fetch(`${database}/complete/card`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        user: username,
        complete: complete
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error with api`);
        }
        return true;
      })
      .then(response => {
        dispatch(getRequestSuccess());
        dispatch(getCards(listName, username));
      })
      .catch(e => {
        dispatch(getRequestFailure({ error: e }));
      });
  };
}
