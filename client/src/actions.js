export const SET_COOKIE = "SET_COOKIE";
export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
export const GET_REQUEST = "GET_REQUEST";
export const GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE";
export const SET_CURRENT_BOARD = "SET_CURRENT_BOARD";
export const SET_USERS = "SET_USERS";
export const SET_BOARDS = "SET_BOARDS";
export const SET_LISTS = "SET_LISTS";
export const SET_CARDS = "SET_CARDS";

export function setCookie(data) {
  return {
    type: SET_COOKIE,
    data
  };
}

export function setUsers(data) {
  return {
    type: SET_USERS,
    data
  };
}

export function setBoards(data) {
  return {
    type: SET_BOARDS,
    data
  };
}

export function setLists(data) {
  return {
    type: SET_LISTS,
    data
  };
}

export function setCards(data, listName) {
  return {
    type: SET_CARDS,
    data: data,
    listName: listName
  };
}

export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function getRequestSuccess(data) {
  return {
    type: GET_REQUEST_SUCCESS,
    data
  };
}

export function getRequestFailure(error) {
  return {
    type: GET_REQUEST_FAILURE,
    error
  };
}

export function setCurrentBoard(data) {
  return {
    type: SET_CURRENT_BOARD,
    data
  };
}

export function getUsers() {
  return dispatch => {
    console.log("Requesting Users");
    dispatch(getRequest());
    fetch("/users")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
        }
        return response.json();
      })
      .then(json => {
        dispatch(setUsers(json.data));
      })
      .catch(error => {
        dispatch(getRequestFailure(error));
      });
  };
}

export function deleteBoard(boardName) {
  return dispatch => {
    console.log("Requesting Delete Board");
    dispatch(getRequest());
    fetch(`/remove/board/${boardName}`).then(() => {
      dispatch(getRequestSuccess());
      dispatch(getBoards());
    });
  };
}

export function deleteList(listName, boardName) {
  return dispatch => {
    console.log("Requesting Delete List");
    dispatch(getRequest());
    fetch(`/remove/list/${listName}`).then(() => {
      dispatch(getRequestSuccess());
      dispatch(getLists(boardName));
    });
  };
}

export function deleteCard(cardName, listName, userName) {
  return dispatch => {
    console.log("Requesting Delete Card");
    dispatch(getRequest());
    fetch(`/remove/card/${cardName}`).then(() => {
      dispatch(getRequestSuccess());
      dispatch(getCards(listName, userName));
    });
  };
}

export function changeBoardName(oldName, newName) {
  return dispatch => {
    console.log("Changing Board Name");
    dispatch(getRequest());
    fetch(`/change/board/${oldName}/${newName}`).then(() => {
      dispatch(getRequestSuccess());
      dispatch(getBoards());
    });
  };
}

export function getBoards() {
  return dispatch => {
    console.log("Requesting Boards");
    dispatch(getRequest());
    fetch("/boards")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
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

export function getLists(boardName) {
  return dispatch => {
    console.log("Requesting Lists");
    dispatch(getRequest());
    fetch(`/lists/${boardName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        dispatch(setLists(json.data));
      })
      .catch(error => {
        dispatch(getRequestFailure(error));
      });
  };
}

export function getCards(listName, username) {
  return dispatch => {
    console.log("Requesting Cards");
    dispatch(getRequest());
    fetch(`/cards/${listName}/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
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
