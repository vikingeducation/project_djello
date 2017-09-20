import { listActions } from "../actions";

const defaultState = {
  list: {},
  fetching: false,
  error: ""
};

const current = (state = defaultState, action) => {
  switch (action.type) {
    case listActions.SET_CURRENT:
      return { list: action.data, error: "", fetching: false };
    case listActions.CLEAR_CURRENT:
      return { ...defaultState };
    case listActions.SET_CURRENT_FETCH:
      return { ...state, fetching: true };
    case listActions.SET_CURRENT_ERROR:
      return { ...state, fetching: false, error: action.data };
    default:
      return state;
  }
};

export default current;
