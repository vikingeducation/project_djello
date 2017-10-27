export const START_REQUEST = "REQUESTING ACITON FROM SERVER";
export const GET_BOARDS_SUCCESS = "GOT ALL THE BOARDS";
export const GET_BOARD_SUCCESS = "GOT A BOARD";
export const CREATE_BOARD_SUCCESS = "BOARD SUCCESSFULLY CREATED";
export const DELETE_REQUEST_SUCCESS = "SUCCESSFULLY DELETED A BOARD";
export const DUMP_BOARD_STORE =
  "SUCCESSFULLY DUMPED ALL BOARD RELATED REDUX MEMORY";
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
const getBoardSuccess = board => {
  return {
    type: GET_BOARD_SUCCESS,
    data: board
  };
};
const createBoardSuccess = board => {
  return {
    type: CREATE_BOARD_SUCCESS,
    data: board
  };
};
const boardFailure = error => {
  return {
    type: BOARD_FAILURE,
    data: error
  };
};
const deleteSuccess = boardId => {
  return {
    type: DELETE_REQUEST_SUCCESS,
    data: boardId
  };
};

//wipe the board related redux memory
export const dumpBoardStore = () => {
  return {
    type: DUMP_BOARD_STORE,
    data: null
  };
};

export const getOneBoard = (boardId, userId) => async dispatch => {
  dispatch(startRequest());
  console.log("fetching one board ");
  let boards;
  let serverResponse;
  try {
    serverResponse = await fetch(`/boards/${boardId}`);
  } catch (e) {
    console.log("error from fetching");
    console.error(e);
    dispatch(boardFailure(e));
  }
  try {
    let board = await serverResponse.json();
    console.log("successfully got a board = ", board);
    dispatch(getBoardSuccess(board));
  } catch (e) {
    console.log("error from response parsing");
    console.error(e);
    dispatch(boardFailure(e));
  }
};

export const getAllBoards = userId => async dispatch => {
  dispatch(startRequest());
  let boards;
  let serverResponse;
  try {
    //get all the boards
    serverResponse = await fetch(`/users/${userId}/boards`);
  } catch (e) {
    console.log("error from fetching");
    console.error(e);
    dispatch(boardFailure(e));
  }
  try {
    let boards = await serverResponse.json();
    dispatch(getBoardsSuccess(boards));
  } catch (e) {
    console.log("error from response parsing");
    console.error(e);
    dispatch(boardFailure(e));
  }
};

export const deleteBoard = (boardId, userID) => async dispatch => {
  dispatch(startRequest());
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
    dispatch(deleteSuccess(boardId));
  } catch (e) {
    console.log("error from fetching");
    console.error(e);
    dispatch(boardFailure(e));
  }
};

//CREATE A BOARD FOR THE LOGGED IN USER
//TODO: FIX THE READING HEADERS FROM SERVER RESPONSE PROBLEM
export const createBoard = (boardName, userId) => async dispatch => {
  dispatch(startRequest());
  console.log(boardName, userId);
  let newBoard = {
    name: boardName
  };
  let serverResponse;
  try {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    const json = JSON.stringify(newBoard);
    serverResponse = await fetch(`/users/${userId}/boards`, {
      headers,
      method: "POST",
      body: json
    });
  } catch (e) {
    console.log("error from creating");
    console.error(e);
    dispatch(boardFailure(e));
  }
  try {
    if (serverResponse.status >= 200 && serverResponse.status < 300) {
      const newBoard = await serverResponse.json();
      dispatch(createBoardSuccess(newBoard));
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
