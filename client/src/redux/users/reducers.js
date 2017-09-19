import { combineReducers } from "redux";
import {
  USER_START_FETCH,
  USER_END_FETCH,
  USER_CLEAR_ERROR,
  USER_ERRORED,
  INSERT_USER,
  USER_NOT_FOUND,
  INIT_USER,
  INSERT_BOARD,
  SELECT_BOARD,
  UNSELECT_BOARD,
  INSERT_LIST,
  INSERT_CARD
} from "./constants";

const initState = {
  user: INIT_USER,
  userIsLoading: false,
  userFetchErrored: null,
  userNotFound: null,
  selectedBoard: null
};

const user = (state = initState.user, action) => {
  switch (action.type) {
    case INSERT_USER:
      return action.payload;
    case INSERT_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload]
      };
    case INSERT_LIST:
      const newBoardsForList = [...state.boards].map(b => {
        if (b._id === action.payload.boardId) {
          b.lists.push(action.payload.data);
        }
        return b;
      });
      return {
        ...state,
        boards: newBoardsForList
      };
    case INSERT_CARD:
      const newBoardsForCard = [...state.boards].map(b => {
        if (b._id === action.payload.boardId) {
          b.lists.map(l => {
            if (l._id === action.payload.listId) {
              l.cards.push(action.payload.data);
            }
            return l;
          });
        }
        return b;
      });
      return {
        ...state,
        boards: newBoardsForCard
      };
    default:
      return state;
  }
};

const userIsLoading = (state = initState.userIsLoading, action) => {
  switch (action.type) {
    case USER_START_FETCH:
      return true;
    case USER_END_FETCH:
      return false;
    default:
      return state;
  }
};

const userFetchErrored = (state = initState.userFetchErrored, action) => {
  switch (action.type) {
    case USER_CLEAR_ERROR:
      return null;
    case USER_ERRORED:
      return action.payload;
    default:
      return state;
  }
};

const userNotFound = (state = initState.userNotFound, action) => {
  switch (action.type) {
    case USER_NOT_FOUND:
      return action.payload;
    default:
      return state;
  }
};

const selectedBoard = (state = initState.selectedBoard, action) => {
  switch (action.type) {
    case SELECT_BOARD:
      return action.payload;
    case UNSELECT_BOARD:
      return null;
    default:
      return state;
  }
};

const app = combineReducers({
  user,
  userIsLoading,
  userFetchErrored,
  userNotFound,
  selectedBoard
});

export default app;
