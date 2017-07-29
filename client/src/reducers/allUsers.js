import * as Actions from "../actions/allUsers";

const initialState = {
  data: []
};

export const allUsers = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case Actions.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
};
