import { currentActions } from "../actions";

const defaultState = {
  board: {},
  fetching: false,
  error: ""
};

const current = (state = defaultState, action) => {
  switch (action.type) {
    case currentActions.SET_CURRENT:
      return { board: action.data, error: "", fetching: false };
    case currentActions.CLEAR_CURRENT:
      return { ...defaultState };
    case currentActions.SET_CURRENT_FETCHING:
      return { ...state, fetching: true };
    case currentActions.SET_CURRENT_ERROR:
      return { ...state, fetching: false, error: action.data };
    default:
      return state;
  }
};

export default current;
