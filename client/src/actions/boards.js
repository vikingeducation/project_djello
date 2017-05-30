import { getUsers } from "./users";
export const GET_BOARDS_SUCCESS = "GET_BOARDS_SUCCESS";
export const GET_REQUEST = "GET_REQUEST";
export const GET_FAILURE = "GET_FAILURE";
export const CHANGE_CURRENT_BOARD = "CHANGE_CURRENT_BOARD";
export const CREATE_NEW_BOARD_SUCCESS = "CREATE_NEW_BOARD_SUCCESS";
export const DELETE_BOARD_SUCCESS = "DELETE_BOARD_SUCCESS";
//change fetch url for development or production
export function getBoardsSuccess(data) {
  return {
    type: GET_BOARDS_SUCCESS,
    data
  };
}

export function getFailure(error) {
  return {
    type: GET_FAILURE,
    error
  };
}
export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function createNewBoardSuccess(data) {
  return {
    type: CREATE_NEW_BOARD_SUCCESS,
    data
  };
}

export function getBoards(userId, boardId) {
  return dispatch => {
    dispatch(getRequest());
    fetch(
      `https://djello-server.herokuapp.com/boards/${userId}?token=${localStorage.getItem("token")}`
    )
      .then(checkStatus)
      .then(json => {
        dispatch(getBoardsSuccess({ json, boardId }));
      })
      .catch(error => {
        dispatch(getFailure(error.message + error.response));
      });
  };
}

export function changeCurrentBoard(data) {
  return {
    type: CHANGE_CURRENT_BOARD,
    data
  };
}

export function createNewBoard(data) {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `name=${data.name}&ownerId=${data.userId}`
  };
  return dispatch => {
    dispatch(getRequest());
    fetch(
      `https://djello-server.herokuapp.com/boards/new?token=${localStorage.getItem("token")}`,
      config
    )
      .then(checkStatus)
      .then(json => {
        dispatch(getBoards(data.userId, json.boardId));
      })
      .catch(error => {
        dispatch(getFailure(error.message + error.response));
      });
  };
}

export function deleteBoardSuccess(boardId) {
  return {
    type: DELETE_BOARD_SUCCESS,
    data: boardId
  };
}

export function deleteBoard(boardId) {
  let config = { method: "DELETE" };
  return dispatch => {
    dispatch(getRequest());
    fetch(
      `https://djello-server.herokuapp.com/boards/delete/${boardId}?token=${localStorage.getItem("token")}`,
      config
    )
      .then(checkStatus)
      .then(json => {
        dispatch(deleteBoardSuccess(json.boardId));
      })
      .catch(error => {
        dispatch(getFailure(error.message + error.response));
      });
  };
}

export function createNewList(data) {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `title=${data.title}&boardId=${+data.boardId}&description=${data.description}`
  };
  return dispatch => {
    dispatch(getRequest());
    fetch(
      `https://djello-server.herokuapp.com/lists/new?token=${localStorage.getItem("token")}`,
      config
    )
      .then(checkStatus)
      .then(json => {
        dispatch(getBoards(localStorage.getItem("userId"), data.boardId));
      })
      .catch(error => {
        dispatch(getFailure(error.message + error.response));
      });
  };
}

//data needs to have listId and boardId
export function deleteList(data) {
  let config = { method: "DELETE" };
  return dispatch => {
    dispatch(getRequest());
    fetch(
      `https://djello-server.herokuapp.com/lists/delete/${data.listId}?token=${localStorage.getItem("token")}`,
      config
    )
      .then(checkStatus)
      .then(json => {
        dispatch(getBoards(localStorage.getItem("userId"), data.boardId));
      })
      .catch(error => {
        dispatch(getFailure(error.message + error.response));
      });
  };
}

//data must have listId, boardId and title, description
export function updateList(data) {
  let config = {
    method: "PUT",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `title=${data.title}&description=${data.description}`
  };
  return dispatch => {
    console.log("DISP");
    dispatch(getRequest());
    fetch(
      `https://djello-server.herokuapp.com/lists/update/${data.listId}?token=${localStorage.getItem("token")}`,
      config
    )
      .then(checkStatus)
      .then(json => {
        dispatch(getBoards(localStorage.getItem("userId"), data.boardId));
      })
      .catch(error => {
        dispatch(getFailure(error.message + error.response));
      });
  };
}

export function createNewCard(data) {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `title=${data.title}&description=${data.description}&listId=${data.listId}`
  };
  return dispatch => {
    dispatch(getRequest());
    fetch(
      `https://djello-server.herokuapp.com/cards/new?token=${localStorage.getItem("token")}`,
      config
    )
      .then(checkStatus)
      .then(json => {
        dispatch(getBoards(localStorage.getItem("userId"), data.boardId));
      })
      .catch(error => {
        dispatch(getFailure(error.message + error.response));
      });
  };
}

export function updateCard(data) {
  console.log(data.name);
  let config = {
    method: "PUT",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `title=${data.title}&description=${data.description}&name=${data.name}`
  };
  return dispatch => {
    dispatch(getRequest());
    fetch(
      `https://djello-server.herokuapp.com/cards/update/${data.cardId}?token=${localStorage.getItem("token")}`,
      config
    )
      .then(checkStatus)
      .then(json => {
        dispatch(getBoards(localStorage.getItem("userId"), data.boardId));
      })
      .catch(error => {
        dispatch(getFailure(error.message + error.response));
      });
  };
}

export function deleteCard(data) {
  let config = { method: "DELETE" };
  return dispatch => {
    dispatch(getRequest());
    fetch(
      `https://djello-server.herokuapp.com/cards/delete/${data.cardId}?token=${localStorage.getItem("token")}`,
      config
    )
      .then(checkStatus)
      .then(json => {
        dispatch(getBoards(localStorage.getItem("userId"), data.boardId));
      })
      .catch(error => {
        dispatch(getFailure(error.message + error.response));
      });
  };
}
export function addMember(data) {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${data.email}&boardId=${data.boardId}`
  };
  return dispatch => {
    dispatch(getRequest());
    fetch(
      `https://djello-server.herokuapp.com/cards/member/add/${data.cardId}?token=${localStorage.getItem("token")}`,
      config
    )
      .then(checkStatus)
      .then(json => {
        dispatch(getBoards(localStorage.getItem("userId"), data.boardId));
      })
      .catch(error => {
        dispatch(getFailure(error.message + error.response));
      });
  };
}
export function deleteMember(data) {
  let config = {
    method: "DELETE",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${data.email}`
  };
  return dispatch => {
    dispatch(getRequest());
    fetch(
      `https://djello-server.herokuapp.com/cards/member/delete/${data.cardId}?token=${localStorage.getItem("token")}`,
      config
    )
      .then(checkStatus)
      .then(json => {
        dispatch(getBoards(localStorage.getItem("userId"), data.boardId));
      })
      .catch(error => {
        dispatch(getFailure(error.message + error.response));
      });
  };
}

function checkStatus(response) {
  // If response not okay, throw an error
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response.json();
}
