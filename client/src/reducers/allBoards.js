import * as Actions from "../actions/allBoards";

export const allBoards = (state = {}, action) => {
  switch (action.type) {
    case Actions.GET_ALL_BOARDS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case Actions.GET_ALL_BOARDS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_ALL_BOARDS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case Actions.ADD_NEW_BOARD:
      return {
        ...state,
        data: [
          ...state.data,
          action.data
        ]
      };
    default:
      return state;
  }
};
