export const SET_LIST = "SET_LIST";
export const CLEAR_LIST = "CLEAR_LIST";
export const SET_LIST_FETCH = "SET_LIST_FETCH";
export const SET_LIST_ERROR = "SET_LIST_ERROR";

export const set = list => ({
  type: SET_LIST,
  data: list
});

export const clear = () => ({
  type: CLEAR_LIST
});

export const setFetching = () => ({
  type: SET_LIST_FETCH
});

export const setError = message => ({
  type: SET_LIST_ERROR,
  data: message
});
