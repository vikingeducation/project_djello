import * as Actions from '../actions/auth';

export const user = (state = {isAuthenticated: false}, action) => {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.data,
        isFetching: false
      };
    case Actions.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: action.error
      };
    case Actions.LOGOUT:
      return {
        isAuthenticated: false
      }
    default:
      return state;
  }
};