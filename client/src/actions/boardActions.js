export const SET_BOARD = "SET_BOARD";
export const CLEAR_BOARD = "CLEAR_BOARD";
export const SET_BOARD_FETCH = "SET_BOARD_FETCH";
export const SET_BOARD_ERROR = "SET_BOARD_ERROR";

export const set = board => ({
  type: SET_BOARD,
  data: board
});

export const clear = () => ({
  type: CLEAR_BOARD
});

export const setFetching = () => ({
  type: SET_BOARD_FETCH
});

export const setError = message => ({
  type: SET_BOARD_ERROR,
  data: message
});
