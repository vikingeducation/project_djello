import socket from "../socket";

export const SET_CURRENT = "SET_CURRENT";
export const SET = "SET";
export const CLEAR = "CLEAR";
export const ADD = "ADD";
export const REMOVE = "REMOVE";

const _setCurrent = board => ({
  type: SET_CURRENT,
  data: board
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

export const setCurrent = slug => dispatch => {
  socket.emit("getBoard", slug);
  socket.on("getBoardSuccess", board => dispatch(_setCurrent(board)));
};
