export const USER_START_FETCH = "USER_START_FETCH";
export const USER_END_FETCH = "USER_END_FETCH";
export const USER_CLEAR_ERROR = "USER_CLEAR_ERROR";
export const USER_ERRORED = "USER_ERRORED";
export const INSERT_USER = "INSERT_USER";
export const USER_NOT_FOUND = "USER_NOT_FOUND";
export const INSERT_BOARD = "INSERT_BOARD";
export const SELECT_BOARD = "SELECT_BOARD";
export const UNSELECT_BOARD = "UNSELECT_BOARD";
export const INSERT_LIST = "INSERT_LIST";
export const INSERT_CARD = "INSERT_CARD";

export const INIT_USER = {
  _id: "",
  email: "",
  boards: [
    {
      title: "",
      description: "",
      lists: [{ title: "", description: "", cards: [{ text: "" }] }]
    }
  ]
};
