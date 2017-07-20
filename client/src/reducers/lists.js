import * as Actions from "../actions/lists";

const initialState = {
  data: []
}
export const lists = (state = initialState, action) => {
  let newData;
  switch (action.type) {
    case Actions.GET_LISTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false
      };
    case Actions.GET_LISTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_LISTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case Actions.ADD_NEW_LIST:
      return {
        ...state,
        data: [
          ...state.data,
          action.data
        ]
      };
    case Actions.SET_CHANGED_LIST:
      newData = state.data.map(list => {
        if (list.id.toString() === action.data._id.toString()) {
          return action.data
        }
        return list;
      });
      return {
        ...state,
        data: newData
      };
    case Actions.DELETE_LIST:
      // action data is the deleted item
      newData = state.data.filter(list => {
        return list.id.toString() !== action.data.id.toString();
      });
      return {
        ...state,
        data: newData
      };
    case Actions.MODIFY_LIST_FAILURE:
      return {
        ...state,
        error: action.data
      }
    default:
      return state;
  }
};
