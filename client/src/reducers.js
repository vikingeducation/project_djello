import { combineReducers } from "redux";

import * as Actions from "./actions";

const initialState = {
  entities: [],
  isFetching: false,
  error: null
};

export function usersReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        entities: action.data
      };
    case Actions.GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const reducers = combineReducers({
  usersReducer
});
