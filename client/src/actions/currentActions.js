export const SET_CURRENT = "SET_CURRENT";
export const CLEAR_CURRENT = "CLEAR_CURRENT";
export const SET_CURRENT_FETCH = "SET_CURRENT_FETCH";
export const SET_CURRENT_ERROR = "SET_CURRENT_ERROR";

export const set = board => ({
  type: SET_CURRENT,
  data: board
});

export const clear = () => ({
  type: CLEAR_CURRENT
});

export const setFetching = () => ({
  type: SET_CURRENT_FETCH
});

export const setError = message => ({
  type: SET_CURRENT_ERROR,
  data: message
});
