export const GET_BOARDS_SUCCESS = "GET_BOARDS_SUCCESS";
export const GET_BOARDS_REQUEST = "GET_BOARDS_REQUEST";
export const GET_BOARDS_FAILURE = "GET_BOARDS_FAILURE";
export const CHANGE_CURRENT_BOARD = "CHANGE_CURRENT_BOARD";
export const CREATE_NEW_BOARD_SUCCESS = "CREATE_NEW_BOARD_SUCCESS";

export function getBoardsSuccess(data) {
  return {
    type: GET_BOARDS_SUCCESS,
    data
  };
}

export function getBoardsFailure(error) {
  return {
    type: GET_BOARDS_FAILURE,
    error
  };
}
export function getBoardsRequest() {
  return {
    type: GET_BOARDS_REQUEST
  };
}

export function createNewBoardSuccess(data) {
  return {
    type: CREATE_NEW_BOARD_SUCCESS,
    data
  };
}

export function getBoards(userId) {
  return dispatch => {
    dispatch(getBoardsRequest());
    fetch(`boards/${userId}`)
      .then(checkStatus)
      .then(json => {
        dispatch(getBoardsSuccess(json));
      })
      .catch(error => {
        dispatch(getBoardsFailure(error.message + error.response));
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
    dispatch(getBoardsRequest());
    fetch(`boards/new`, config)
      .then(checkStatus)
      .then(json => {
        dispatch(getBoards(data.userId));
        dispatch(changeCurrentBoard(json.board));
      })
      .catch(error => {
        dispatch(getBoardsFailure(error.message + error.response));
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
