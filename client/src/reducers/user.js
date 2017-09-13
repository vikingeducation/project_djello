import {
  REQUEST_CHECK_USER,
  SUCCESS_CHECK_USER,
  FAILURE_CHECK_USER
} from "../actions/user";

const intialState = {
  user: null,
  isFetching: false,
  error: null
};
const user = (state = intialState, action) => {
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
    default:
      return state;
  }
};
export default user;
