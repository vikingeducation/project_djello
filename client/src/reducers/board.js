import { START_REQUEST, BOARD_SUCESS, BOARD_FAILURE } from "../actions/board";
//
// const intialState = {
//   isFetching: false,
//   error: null,
//   success: null,
//   board: null
// };

const board = (state = {}, action) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        isFetching: true,
        ...state
      };
    case BOARD_SUCESS:
      return {
        ...state,
        isFetching: false,
        board: action.data
      };
    case BOARD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.data
      };
    default:
      return state;
  }
};
export default board;
