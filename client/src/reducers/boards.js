import { boardActions } from "../actions";

const defaultState = {
  list: [],
  current: {}
};

const boards = (state = defaultState, action) => {
  switch (action.type) {
    case boardActions.SET_CURRENT:
      const current =
        state.list.reduce(
          (b, board) => (board.slug === action.data ? board : b),
          {}
        ) || state.current;
      return { ...state, ...{ current } };
    case boardActions.SET:
      return { ...state, list: action.data };
    case boardActions.CLEAR:
      return { ...defaultState };
    case boardActions.ADD:
      return { ...state, list: [...state.list].concat(action.data) };
    case boardActions.REMOVE:
      return {
        ...state,
        list: state.list.filter(board => board.slug !== action.data)
      };
    default:
      return state;
  }
};

export default boards;
