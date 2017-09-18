export const START_REQUEST = "REQUESTING ACTIO FROM SERVER";
export const GET_LISTS_SUCCESS = "GOT ALL THE LISTS";
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

const listFailure = error => {
  return {
    type: LIST_FAILURE,
    data: error
  };
};

export const getAllLists = (userId, boardId) => async dispatch => {
  dispatch(startRequest());
  console.log("fetching lists ");
  let lists;
  let serverResponse;
  try {
    //get all the lists for a given board
    serverResponse = await fetch(`/lists?user=${userId}&board=${boardId}`);
    // console.log(`serverResponse = ${serverResponse}`);
  } catch (e) {
    console.log("error from fetching");
    console.error(e);
    dispatch(listFailure(e));
  }
  try {
    let lists = await serverResponse.json();
    // console.log("boards action, boards = ", boards);
    dispatch(getListsSuccess(lists));
  } catch (e) {
    console.log("error from response parsing");
    console.error(e);
    dispatch(listFailure(e));
  }
};
