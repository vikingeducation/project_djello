export const SET_CURRENT = "SET_CURRENT";
export const SET = "SET";
export const CLEAR = "CLEAR";
export const ADD = "ADD";
export const REMOVE = "REMOVE";

export const setCurrent = slug => ({
  type: SET_CURRENT,
  data: slug
});

export const set = boards => ({
  type: SET,
  data: boards
});

export const clear = () => ({
  type: CLEAR
});

export const add = board => ({
  type: ADD,
  data: board
});

export const remove = slug => ({
  type: REMOVE,
  data: slug
});
