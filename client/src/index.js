import React from 'react';
import ReactDOM from 'react-dom';
import "bootswatch/flatly/bootstrap.min.css";
import './index.css';
import AppContainer from './containers/AppContainer';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import djelloApp from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  djelloApp,
  // persistedState,
  composeEnhancers(applyMiddleware(thunk))
);



ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);
