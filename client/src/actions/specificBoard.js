import { getAllBoardsInit, addNewBoard, setChangedBoard } from "./allBoards";
import { getListsSuccess } from "./lists";
export const GET_SPECIFIC_BOARD_REQUEST = "GET_SPECIFIC_BOARD_REQUEST";
export const GET_SPECIFIC_BOARD_SUCCESS = "GET_SPECIFIC_BOARD_SUCCESS";
export const GET_SPECIFIC_BOARD_FAILURE = "GET_SPECIFIC_BOARD_FAILURE";

export function getSpecificBoardRequest() {
  return {
    type: GET_SPECIFIC_BOARD_REQUEST
  };
}

export function getSpecificBoardSuccess(data) {
  return {
    type: GET_SPECIFIC_BOARD_SUCCESS,
    data
  };
}

export function getSpecificBoardFailure(error) {
  return {
    type: GET_SPECIFIC_BOARD_FAILURE,
    error
  };
}

export function getSpecificBoard(token, boardId) {
  let config = {
    method: "GET",
    headers: { Authorization: "Bearer " + token }
  };

  return dispatch => {
    dispatch(getSpecificBoardRequest());

    fetch(`api/v1/boards/${boardId}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        dispatch(getSpecificBoardSuccess(json.data));
        dispatch(getListsSuccess(json.data.lists));
      })
      .catch(error => {
        dispatch(getSpecificBoardFailure(error));
      });
  };
}

export function editSpecificBoard(token, boardId, form, userId) {
  let config = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form
  };

  return dispatch => {
    dispatch(getSpecificBoardRequest());

    fetch(`api/v1/boards/${boardId}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        let changedBoard = {
          id: json.data._id,
          title: json.data.title
        }
        dispatch(getSpecificBoardSuccess(json.data));
        dispatch(setChangedBoard(changedBoard));
      })
      .catch(error => {
        dispatch(getSpecificBoardFailure(error));
      });
  };
}

export function createBoard(token, userId) {
  let config = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "title=New Board"
  };

  return dispatch => {
    dispatch(getSpecificBoardRequest());

    fetch(`api/v1/users/${userId}/boards`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        dispatch(getSpecificBoardSuccess(json.data));
        let newBoard = {
          id: json.data._id,
          title: json.data.title
        }
        dispatch(addNewBoard(newBoard));
      })
      .catch(error => {
        dispatch(getSpecificBoardFailure(error));
      });
  };
}

export function deleteBoard(token, boardId, userId) {
  let config = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  };

  return dispatch => {
    dispatch(getSpecificBoardRequest());

    fetch(`api/v1/boards/${boardId}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(() => {
        dispatch(getAllBoardsInit(token, userId));
      })
      .catch(error => {
        dispatch(getSpecificBoardFailure(error));
      });
  };
}
