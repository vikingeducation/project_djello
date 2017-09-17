export const SET_CURRENT = "SET_CURRENT";

export const setCurrent = board => {
  return {
    type: SET_CURRENT,
    data: board
  };
};
