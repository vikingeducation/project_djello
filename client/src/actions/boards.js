import {
  BASE_URL,
  BOARDS_REQUEST,
  BOARDS_GET_SUCCESS,
  BOARDS_GET_FAILURE
} from "./constants";

export const boardsRequest = () => ({
  type: BOARDS_REQUEST
});

export const boardsGetSuccess = data => ({
  type: BOARDS_GET_SUCCESS,
  data
});

export const boardsGetFailure = error => ({
  type: BOARDS_GET_FAILURE
});

// put boardId as your input here
export const boardsGet = () => async dispatch => {
  dispatch(boardsRequest());
  let url = `${BASE_URL}/boards`;
  let result;

  try {
    result = await fetch(url);
    result = await result.json();
    dispatch(boardsGetSuccess(result));
  } catch (err) {
    dispatch(boardsGetFailure(err));
  }
};
