import { getSpecificBoardSuccess } from "./specificBoard";
import { getListsSuccess } from "./lists";
export const GET_ALL_BOARDS_REQUEST = "GET_ALL_BOARDS_REQUEST";
export const GET_ALL_BOARDS_SUCCESS = "GET_ALL_BOARDS_SUCCESS";
export const GET_ALL_BOARDS_FAILURE = "GET_ALL_BOARDS_FAILURE";
export const ADD_NEW_BOARD = "ADD_NEW_BOARD";
export const SET_CHANGED_BOARD = "SET_CHANGED_BOARD";

export function getAllBoardsRequest() {
  return {
    type: GET_ALL_BOARDS_REQUEST
  };
}

export function getAllBoardsSuccess(data) {
  return {
    type: GET_ALL_BOARDS_SUCCESS,
    data
  };
}

export function getAllBoardsFailure(error) {
  return {
    type: GET_ALL_BOARDS_FAILURE,
    error
  };
}

export function addNewBoard(data) {
  return {
    type: ADD_NEW_BOARD,
    data
  };
}

export function setChangedBoard(data) {
  return {
    type: SET_CHANGED_BOARD,
    data
  };
}

export function getAllBoardsInit(token, userId) {
  let config = {
    method: "GET",
    headers: { Authorization: "Bearer " + token }
  };

  return dispatch => {
    dispatch(getAllBoardsRequest());

    fetch(`api/v1/users/${userId}/boards`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        let boardIds = json.data.map(board => {
          return {
            id: board._id,
            title: board.title
          };
        });
        let specificBoard = json.data[0];
        dispatch(getAllBoardsSuccess(boardIds));
        dispatch(getSpecificBoardSuccess(specificBoard));
        dispatch(getListsSuccess(specificBoard.lists));
      })
      .catch(error => {
        dispatch(getAllBoardsFailure(error));
      });
  };
}

export function getAllBoards(token, userId) {
  let config = {
    method: "GET",
    headers: { Authorization: "Bearer " + token }
  };

  return dispatch => {
    dispatch(getAllBoardsRequest());

    fetch(`api/v1/users/${userId}/boards`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        let boardIds = json.data.map(board => {
          return {
            id: board._id,
            title: board.title
          };
        });
        dispatch(getAllBoardsSuccess(boardIds));
      })
      .catch(error => {
        dispatch(getAllBoardsFailure(error));
      });
  };
}
