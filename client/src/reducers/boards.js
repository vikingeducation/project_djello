import { boardActions } from "../actions";

const defaultState = [];

const boards = (state = defaultState, action) => {
  switch (action.type) {
    case boardActions.SET_BOARDS:
      console.log(action.data);
      return [...action.data];
    case boardActions.CLEAR_BOARD:
      return [...defaultState];
    case boardActions.ADD_BOARD:
      return [...state].concat(action.data);
    case boardActions.REMOVE_BOARD:
      return state.filter(board => board.slug !== action.data);
    default:
      return state;
  }
};

export default boards;
