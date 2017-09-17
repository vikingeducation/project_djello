import { boardActions } from "../actions";

const defaultState = {
  boards: [],
  current: {}
};

const boards = (state = defaultState, action) => {
  switch (action.type) {
    case boardActions.SET_CURRENT:
      return { ...state, current: action.data };
    case boardActions.SET:
      return { ...state, boards: action.data };
    case boardActions.CLEAR:
      return { ...defaultState };
    case boardActions.ADD:
      return { ...state, boards: [...state.boards].concat(action.data) };
    case boardActions.REMOVE:
      return {
        ...state,
        boards: state.boards.filter(board => board.slug !== action.data)
      };
    default:
      return state;
  }
};

export default boards;
