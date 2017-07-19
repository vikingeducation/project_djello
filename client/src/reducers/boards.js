import * as Actions from '../actions/boards';

export const boards = (state = {}, action) => {
  switch (action.type) {
    case Actions.GET_ALL_BOARDS_SUCCESS:
      return {
        ...state,
        allBoards: action.data.boardIds,
        specificBoard: action.data.specificBoard,
        isFetchingAll: false
      };
    case Actions.GET_ALL_BOARDS_REQUEST:
      return {
        ...state,
        isFetchingAll: true,
        error: null
      };
    case Actions.GET_ALL_BOARDS_FAILURE:
      return {
        ...state,
        isFetchingAll: false,
        error: true
      };
    default:
      return state;
  }
};