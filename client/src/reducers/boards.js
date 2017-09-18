import { boardActions } from "../actions";

const defaultState = [];

const boards = (state = defaultState, action) => {
  switch (action.type) {
    case boardActions.SET:
      return action.data;
    case boardActions.CLEAR:
      return [...defaultState];
    case boardActions.ADD:
      return [...state].concat(action.data);
    case boardActions.REMOVE:
      return state.filter(board => board.slug !== action.data);
    default:
      return state;
  }
};

export default boards;
