import { UserActions } from "../actions";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from "../actions/constants";

const initialState = {
  userData: null,
  isFetching: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case USER_LOGIN_SUCCESS:
      console.log("user success data: ", action.data);
      return {
        ...state,
        isFetching: false,
        userData: action.data
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};
