export const GET_LISTS_REQUEST = "GET_LISTS_REQUEST";
export const GET_LISTS_SUCCESS = "GET_LISTS_SUCCESS";
export const GET_LISTS_FAILURE = "GET_LISTS_FAILURE";
export const MODIFY_LIST_FAILURE = "MODIFY_LIST_FAILURE";
export const ADD_NEW_LIST = "ADD_NEW_LIST";
export const SET_CHANGED_LIST = "SET_CHANGED_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const SET_CHANGED_CARD = "SET_CHANGED_CARD";

export function getListsRequest() {
  return {
    type: GET_LISTS_REQUEST
  };
}

export function getListsSuccess(data) {
  return {
    type: GET_LISTS_SUCCESS,
    data
  };
}

export function getListsFailure(error) {
  return {
    type: GET_LISTS_FAILURE,
    error
  };
}

export function addNewList(data) {
  return {
    type: ADD_NEW_LIST,
    data
  };
}

export function setChangedList(data) {
  return {
    type: SET_CHANGED_LIST,
    data
  };
}

export function deleteList(data) {
  return {
    type: DELETE_LIST,
    data
  }
}

export function modifyListFailure(data) {
  return {
    type: MODIFY_LIST_FAILURE,
    data
  }
}

export function setChangedCard(data) {
  return {
    type: SET_CHANGED_CARD,
    data
  };
}

export function getLists(token, boardId) {
  let config = {
    method: "GET",
    headers: { Authorization: "Bearer " + token }
  };

  return dispatch => {
    dispatch(getListsRequest());

    fetch(`api/v1/boards/${boardId}/lists`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        dispatch(getListsSuccess(json.data));
      })
      .catch(error => {
        dispatch(getListsFailure(error));
      });
  };
}


export function editList(token, listId, form) {
  let config = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form
  };

  return dispatch => {
    fetch(`api/v1/lists/${listId}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        dispatch(setChangedList(json.data));
      })
      .catch(error => {
        dispatch(modifyListFailure(error));
      });
  };
}

export function createList(token, boardId) {
  let config = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "title=New List&description=Enter a description here"
  };

  return dispatch => {
    fetch(`api/v1/boards/${boardId}/lists`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        dispatch(addNewList(json.data));
      })
      .catch(error => {
        dispatch(modifyListFailure(error));
      });
  };
}

export function deleteSelectedList(token, listId) {
  let config = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  };
  return dispatch => {
    fetch(`api/v1/lists/${listId}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        dispatch(deleteList(json.data.deletedResource));
      })
      .catch(error => {
        dispatch(modifyListFailure(error));
      });
  };
}

/*  ===============
  Nested Card Actions
================ */
export function editCard(token, cardId, form) {
let config = {
  method: "PUT",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: form
};

return dispatch => {
  fetch(`api/v1/cards/${cardId}`, config)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response.json();
    })
    .then(json => {
      dispatch(setChangedCard(json.data));
    })
    .catch(error => {
      dispatch(modifyListFailure(error));
    });
};
}