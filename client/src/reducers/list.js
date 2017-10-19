import {
  START_REQUEST,
  GET_LISTS_SUCCESS,
  GET_LIST_SUCCESS,
  CREATE_LIST_SUCCESS,
  DELETE_LIST_SUCCESS,
  UPDATE_LIST_SUCCESS,
  UPDATE_CARD_SUCCESS,
  DUMP_LIST_STORE,
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
  let updatedLists;
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
      updatedLists = state.lists.map(list => {
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
    case UPDATE_CARD_SUCCESS:
      updatedLists = state.lists.map(list => {
        if (list._id === action.data.listId) {
          //modifying the state, like I just don't care
          list.cards = list.cards.map(card => {
            if (card._id === action.data.card._id) {
              return action.data.card;
            }
            return card;
          });
          return list;
        }
        return list;
      });
      console.log("updatedLists = ", updatedLists);
      return {
        ...state,
        lists: updatedLists
      };
    case DUMP_LIST_STORE:
      return {
        isFetching: false,
        error: null,
        success: null,
        lists: null
      };
    default:
      return state;
  }
};
export default list;
