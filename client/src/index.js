import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./containers/AppContainer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { app } from "./reducers";

const store = createStore(app, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
