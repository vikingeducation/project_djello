export const START_REQUEST = "REQUESTING ACITON FROM SERVER";
export const DELETE_REQUEST_SUCCESS = "SUCCESSFUL REQUEST";
export const GET_BOARDS_SUCCESS = "GOT ALL THE BOARDS";
export const BOARD_SUCESS = "BOARD SUCCESSFULLY CREATED";
export const BOARD_FAILURE = "FAILURE WITH BOARDS";

const startRequest = () => {
  return {
    type: START_REQUEST,
    data: null
  };
};
const getBoardsSuccess = boards => {
  return {
    type: GET_BOARDS_SUCCESS,
    data: boards
  };
};
const boardSuccess = board => {
  return {
    type: BOARD_SUCESS,
    data: board
  };
};
const boardFailure = error => {
  return {
    type: BOARD_FAILURE,
    data: error
  };
};
const deleteSuccess = () => {
  return {
    type: DELETE_REQUEST_SUCCESS,
    data: null
  };
};

export const deleteBoard = (boardId, userID) => async dispatch => {
  dispatch(startRequest());
  console.log("deleting board");
  let boards;
  let serverResponse;
  try {
    var headers = new Headers();
    headers.append("Content-type", "application/json");
    var json = JSON.stringify(boardId);
    serverResponse = await fetch(`/boards/${boardId}?user=${userID}`, {
      headers,
      method: "DELETE",
      body: null
    });
    console.log(`serverResponse = ${serverResponse}`);
    dispatch(deleteSuccess());
  } catch (e) {
    console.log("error from fetching");
    console.error(e);
    dispatch(boardFailure(e));
  }
};

export const getAllBoards = user => async dispatch => {
  dispatch(startRequest());
  console.log("fetching boards ");
  let boards;
  let serverResponse;
  try {
    //get all the boards
    // console.log("starting request ");
    serverResponse = await fetch(`/boards?user=${user.username}`);
    // console.log(`serverResponse = ${serverResponse}`);
  } catch (e) {
    console.log("error from fetching");
    console.error(e);
    dispatch(boardFailure(e));
  }
  try {
    let boards = await serverResponse.json();
    // console.log("boards action, boards = ", boards);
    dispatch(getBoardsSuccess(boards));
  } catch (e) {
    console.log("error from response parsing");
    console.error(e);
    dispatch(boardFailure(e));
  }
};

export const createBoard = name => async dispatch => {
  dispatch(startRequest());
  let newBoard = {
    name: "newBoard now plix plox"
  };
  let serverResponse;
  try {
    //TRY to make a board
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    const json = JSON.stringify(newBoard);
    serverResponse = await fetch("/boards", {
      headers,
      method: "POST",
      body: json
    });
  } catch (e) {
    console.log("error from fetching");
    console.error(e);
    dispatch(boardFailure(e));
  }
  try {
    console.log("serverResponse, ", serverResponse);
    if (serverResponse.status == 200) {
      newBoard = await serverResponse.json();
      dispatch(boardSuccess(newBoard));
    } else {
      //TODO: SET ERROR LATER
      console.log("error from server");
      const e = new Error("server rejected adding a board");
      console.error(e);
      dispatch(boardFailure(e));
    }
  } catch (e) {
    console.log("error from response parsing");
    console.error(e);
    dispatch(boardFailure(e));
  }

  return newBoard;
};
