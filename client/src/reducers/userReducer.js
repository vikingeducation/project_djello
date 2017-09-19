import * as Actions from "../actions/userActions.js";

const initialState = {
  user: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetching: false
      };
    case Actions.GET_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};