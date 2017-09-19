import {
  BASE_URL,
  LISTS_REQUEST,
  LISTS_GET_SUCCESS,
  LISTS_GET_FAILURE
} from "./constants";

export const listsRequest = () => ({
  type: LISTS_REQUEST
});

export const listsGetSuccess = data => ({
  type: LISTS_GET_SUCCESS,
  data
});

export const listsGetFailure = error => ({
  type: LISTS_GET_FAILURE
});

// put boardId as your input here
export const listsGet = () => async dispatch => {
  dispatch(listsRequest());
  let url = `${BASE_URL}/lists`;
  let result;

  try {
    result = await fetch(url);
    result = await result.json();
    dispatch(listsGetSuccess(result));
  } catch (err) {
    dispatch(listsGetFailure(err));
  }
};
