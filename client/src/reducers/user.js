import {
  REQUEST_CHECK_USER,
  SUCCESS_CHECK_USER,
  FAILURE_CHECK_USER,
  LOGIN_USER,
  LOGOUT_USER
} from "../actions/user";

// const intialState = {
//   username: null,
//   isFetching: false,
//   loggedIn: false,
//   error: null
// };
const user = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CHECK_USER:
      return {
        ...state,
        isFetching: true
      };
    case SUCCESS_CHECK_USER:
      return {
        ...state,
        ...action.data,
        isFetching: false
      };
    case FAILURE_CHECK_USER:
      return {
        ...state,
        isFetching: false,
        error: action.data
      };
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: true
      };
    case LOGOUT_USER:
      return {
        loggedIn: false
      };
    default:
      return state;
  }
};
export default user;
