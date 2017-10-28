import { listActions } from "../actions";

const defaultState = {
  data: {},
  fetching: false,
  error: ""
};

const current = (state = defaultState, action) => {
  switch (action.type) {
    case listActions.SET_LIST:
      return { data: action.data, error: "", fetching: false };
    case listActions.CLEAR_CURRENT:
      return { ...defaultState };
    case listActions.SET_LIST_FETCH:
      return { ...state, fetching: true };
    case listActions.SET_LIST_ERROR:
      return { ...state, fetching: false, error: action.data };
    default:
      return state;
  }
};

export default current;
