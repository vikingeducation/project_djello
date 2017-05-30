import {
  GET_USERS_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_FAILURE
} from "../actions/users";

export default function users(
  state = { data: [], isFetching: false, error: null },
  action
) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        data: action.data.users
      };
    default:
      return state;
  }
}
