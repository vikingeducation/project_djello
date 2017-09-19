export const SET_BOARD = "SET_BOARD";
export const CLEAR_BOARD = "CLEAR_BOARD";
export const ADD_BOARD = "ADD_BOARD";
export const REMOVE_BOARD = "REMOVE_BOARD";

export const set = boards => ({
  type: SET_BOARD,
  data: boards
});

export const clear = () => ({
  type: CLEAR_BOARD
});

export const add = board => ({
  type: ADD_BOARD,
  data: board
});

export const remove = slug => ({
  type: REMOVE_BOARD,
  data: slug
});
