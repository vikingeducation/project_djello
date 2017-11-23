import * as Actions from "./actions";

const initailState = {
  cookie: ""
};

export function djello(state = initailState, action) {
  console.log("Redux--", action);
  switch (action.type) {
    case Actions.SET_COOKIE:
      return {
        ...state,
        cookie: action.data
      };
    default:
      return state;
  }
}
