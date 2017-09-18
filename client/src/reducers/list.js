import {
  START_REQUEST,
  GET_LISTS_SUCCESS,
  LIST_FAILURE
} from "../actions/list";

//
// const intialState = {
//   isFetching: false,
//   error: null,
//   success: null,
//   lists: null
// };

const board = (state = {}, action) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        isFetching: true,
        ...state
      };
    case GET_LISTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lists: action.data
      };
    case LIST_FAILURE:
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
