import {
  START_REQUEST,
  GET_LISTS_SUCCESS,
  CREATE_LIST_SUCCESS,
  DELETE_LIST_SUCCESS,
  UPDATE_LIST_SUCCESS,
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
    case DELETE_LIST_SUCCESS:
      const filteredLists = state.lists.filter(
        list => action.data !== list._id
      );
      return {
        ...state,
        isFetching: false,
        lists: filteredLists
      };
    case CREATE_LIST_SUCCESS:
      const newLists = state.lists.concat(action.data);
      return {
        ...state,
        isFetching: false,
        lists: newLists
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
