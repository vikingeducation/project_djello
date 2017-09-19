import { createStore, applyMiddleware, combineReducers } from "redux";
// import { persistStore, autoRehydrate } from "redux-persist";
import thunk from "redux-thunk";

import * as Reducers from "./reducers";

const store = createStore(
  combineReducers({ ...Reducers }),
  applyMiddleware(thunk)
);

// persistStore(store);

export default store;
