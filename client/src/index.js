import React from "react";
import ReactDOM from "react-dom";
import "bootswatch/flatly/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "./index.css";
import AppContainer from "./containers/AppContainer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import djelloApp from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = localStorage.getItem("djelloAppState")
  ? JSON.parse(localStorage.getItem("djelloAppState"))
  : {};

const store = createStore(
  djelloApp,
  { user: persistedState },
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  localStorage.setItem("djelloAppState", JSON.stringify(store.getState().user));
});

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
