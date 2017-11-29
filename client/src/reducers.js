import * as Actions from "./actions";

const initailState = {
  cookie: "",
  user: "",
  currentBoard: "",
  users: [],
  boards: [],
  lists: [],
  cards: {},
  isFetching: false,
  error: null
};

export function djello(state = initailState, action) {
  console.log("Redux--", action);
  switch (action.type) {
    case Actions.SET_COOKIE:
      return {
        ...state,
        cookie: action.data,
        user: action.data.split(":")[0]
      };
    case Actions.SET_USERS:
      return {
        ...state,
        users: action.data,
        isFetching: false
      };
    case Actions.SET_BOARDS:
      return {
        ...state,
        boards: action.data,
        isFetching: false
      };
    case Actions.SET_LISTS:
      let cardObjects = {};
      for (var i = 0; i < action.data.length; i++) {
        if (state.cards[action.data[i].title]) {
          cardObjects[action.data[i].title] = state.cards[action.data[i].title];
        } else {
          cardObjects[action.data[i].title] = [];
        }
      }
      return {
        ...state,
        lists: action.data,
        cards: cardObjects,
        isFetching: false
      };
    case Actions.SET_CARDS:
      return {
        ...state,
        cards: { ...state.cards, [action.listName]: action.data },
        isFetching: false
      };
    case Actions.GET_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null
      };
    case Actions.GET_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case Actions.SET_CURRENT_BOARD:
      return {
        ...state,
        currentBoard: action.data
      };
    default:
      return state;
  }
}
