//TODO: DELETE THE CARD REDUX FILES, I BELIEVE THEY'RE UNUSED

import {
  START_REQUEST,
  CREATE_CARD_SUCCESS,
  CARD_FAILURE
} from "../actions/card";

// const initState = {
//   isFetching: false,
//   error: null,
// }

const card = (state = {}, action) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        isFetching: true,
        ...state
      };
    case CREATE_CARD_SUCCESS:
      return {
        isFetching: false,
        ...state
      };
    case CARD_FAILURE:
      return {
        isFetching: false,
        ...state
      };
    default:
      return state;
  }
};
export default card;
