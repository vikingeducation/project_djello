import {
  START_REQUEST,
  GET_LISTS_SUCCESS,
  GET_LIST_SUCCESS,
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

const list = (state = {}, action) => {
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
    case GET_LIST_SUCCESS:
      const lists = state.lists.map(list => {
        if (list._id === action.data._id) return action.data;
        return list;
      });
      return {
        ...state,
        isFetching: false,
        lists: lists
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
    case UPDATE_LIST_SUCCESS:
      console.log("updatin list in reducers = ", action.data);
      const updatedLists = state.lists.map(list => {
        if (list._id === action.data._id) return action.data;
        return list;
      });
      return {
        ...state,
        isFetching: false,
        lists: updatedLists
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
export default list;
