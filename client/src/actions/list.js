export const START_REQUEST = "REQUESTING ACTIO FROM SERVER";
export const GET_LISTS_SUCCESS = "GOT ALL THE LISTS";
export const CREATE_LIST_SUCCESS = "SUCCESS CREATING A LIST";
export const DELETE_LIST_SUCCESS = "SUCCESS DELETING A  LIST";
export const UPDATE_LIST_SUCCESS = "SUCCESS UPDATING A LIST";
export const LIST_FAILURE = "FAILURE WITH LISTS";

const startRequest = () => {
  return {
    type: START_REQUEST,
    data: null
  };
};
const getListsSuccess = lists => {
  return {
    type: GET_LISTS_SUCCESS,
    data: lists
  };
};
const createListSuccess = list => {
  return {
    type: CREATE_LIST_SUCCESS,
    data: list
  };
};
const deleteListSuccess = listId => {
  return {
    type: DELETE_LIST_SUCCESS,
    data: listId
  };
};
const updateListSuccess = list => {
  return {
    type: UPDATE_LIST_SUCCESS,
    data: list
  };
};
const listFailure = error => {
  return {
    type: LIST_FAILURE,
    data: error
  };
};

export const deleteList = listId => async dispatch => {
  dispatch(startRequest());
  let serverResponse;
  try {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    serverResponse = await fetch(`/lists/${listId}`, {
      headers,
      method: "DELETE",
      body: null
    });
  } catch (e) {
    console.error(e);
    dispatch(listFailure(e));
  }
  if (serverResponse.status === 200) {
    dispatch(deleteListSuccess(listId));
  } else {
    dispatch(listFailure(new Error("server disagrees with deleting")));
  }
};
//TODO: implement these
export const createList = (boardId, name = "new list") => async dispatch => {
  dispatch(startRequest());
  let serverResponse;
  try {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    const data = JSON.stringify({ name, boardId });
    serverResponse = await fetch(`/lists`, {
      headers,
      method: "POST",
      body: data
    });
  } catch (e) {
    console.error(e);
    dispatch(listFailure(e));
  }
  if (serverResponse.status === 200) {
    const list = await serverResponse.json();
    dispatch(createListSuccess(list));
  } else {
    dispatch(listFailure(new Error("server disagrees with deleting")));
  }
};
export const updateList = list => async dispatch => {
  dispatch(startRequest());
  let serverResponse;
  let listId = "nananer";
  console.log("attempting to update list = ", list);
  try {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    let data = JSON.stringify(list);
    console.log("sending data = ", data);
    serverResponse = await fetch(`/lists/${list._id}`, {
      headers,
      method: "PUT",
      body: data
    });
  } catch (e) {
    console.error(e);
    dispatch(listFailure(e));
  }
  if (serverResponse.status === 200) {
    list = await serverResponse.json();
    dispatch(updateListSuccess(list));
  } else if (serverResponse.status === 204) {
    dispatch(updateListSuccess(list));
  } else {
    dispatch(listFailure(new Error("server disagrees with deleting")));
  }
};

export const getAllLists = (userId, boardId) => async dispatch => {
  dispatch(startRequest());
  console.log("fetching lists ");
  let lists;
  let serverResponse;
  try {
    //get all the lists for a given board
    console.log("boardID = ", boardId, " userId = ", userId);
    serverResponse = await fetch(`/lists?user=${userId}&board=${boardId}`);
    console.log(`serverResponse = ${serverResponse}`);
  } catch (e) {
    console.log("error from fetching");
    console.error(e);
    dispatch(listFailure(e));
  }
  try {
    let lists = await serverResponse.json();
    console.log("server gave us lists = ", lists);
    dispatch(getListsSuccess(lists));
  } catch (e) {
    console.log("error from response parsing");
    console.error(e);
    dispatch(listFailure(e));
  }
};
