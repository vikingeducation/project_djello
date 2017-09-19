import { CardsActions } from "../actions";
import {
  CARDS_REQUEST,
  CARDS_GET_SUCCESS,
  CARDS_GET_FAILURE
} from "../actions/constants";

const initialState = {
  cardsData: [],
  isFetching: false,
  error: null,
  list: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CARDS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case CARDS_GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cardsData: !state.list
          ? action.data
          : action.data.filter(card => card.list === state.list)
      };
    case CARDS_GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
};
