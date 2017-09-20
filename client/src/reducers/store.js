import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import user from "./user";
import boards from "./boards";
import current from "./current";
import list from "./list";

const reducers = combineReducers({ user, boards, current, list });

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
