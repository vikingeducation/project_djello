import * as Actions from "../actions/allBoards";

const initialState = {
  data: []
}
export const allBoards = (state = initialState, action) => {
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
    case Actions.SET_CHANGED_BOARD:
      let newData = state.data.map(board => {
        if (board.id.toString() === action.data.id.toString()) {
          return action.data
        }
        return board;
      });
      return {
        ...state,
        data: newData
      };
    default:
      return state;
  }
};
