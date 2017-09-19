import { UsersActions } from "../actions";
import {
  USERS_REQUEST,
  USERS_GET_SUCCESS,
  USERS_GET_FAILURE
} from "../actions/constants";

const initialState = {
  usersData: [],
  isFetching: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case USERS_GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        usersData: action.data
      };
    case USERS_GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};
