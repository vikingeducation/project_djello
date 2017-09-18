import * as Actions from "../actions/actions.js";

const initialState = {
  email: null,
  isFetching: false,
  authenticated: false,
  error: null
};

export const reducer = (state=initialState, action)=>{
  switch (action.type) {
    case Actions.LOGIN_REQUEST:
      return {
        ...state,
        isfetching: true,
        error: null,
      }
    case Actions.LOGIN_FAILURE: 
      return {
        ...state,
        isFetching: false,
        authenticated: false,
        error: action.error,
      }
    case Actions.LOGIN_SUCCESS: 
      return {
        ...state,
        isFetching: false,
        authenticated: true,
        email: action.payload.email,
      }
    case Actions.LOGIN:
      return {
        email: action.payload.email
      }
    case Actions.LOGOUT: 
      return initialState
    default:
      return state
  }
}