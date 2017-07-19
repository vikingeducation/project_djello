import * as Actions from '../actions/boards';

export const boards = (state = {}, action) => {
  switch (action.type) {
    case Actions.GET_ALL_BOARDS_SUCCESS:
      return {
        ...state,
        allBoards: action.data.boardIds,
        specificBoard: action.data.specificBoard,
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
    default:
      return state;
  }
};