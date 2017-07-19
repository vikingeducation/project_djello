import * as Actions from '../actions/specificBoard';

export const specificBoard = (state = {}, action) => {
  switch (action.type) {
    case Actions.GET_SPECIFIC_BOARD_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case Actions.GET_SPECIFIC_BOARD_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_SPECIFIC_BOARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
};