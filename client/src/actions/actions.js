import { SET_COOKIE, SET_USERS, SET_INPUTFIELD_SHOW } from "./constents/types";
import { getRequest, getRequestSuccess, getRequestFailure } from "./Requests";
import { database } from "./constents/database";

export function setCookie(data) {
  return {
    type: SET_COOKIE,
    data
  };
}

export function setInputfieldShow(data) {
  return {
    type: SET_INPUTFIELD_SHOW,
    data
  };
}

export function setUsers(data) {
  return {
    type: SET_USERS,
    data
  };
}

export function getUsers() {
  return dispatch => {
    console.log("Requesting Users");
    dispatch(getRequest());
    fetch(`${database}/users`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
        }
        return response.json();
      })
      .then(json => {
        dispatch(getRequestSuccess());
        dispatch(setUsers(json.data));
      })
      .catch(error => {
        dispatch(getRequestFailure(error));
      });
  };
}
