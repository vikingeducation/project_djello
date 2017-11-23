import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import LoginCheck from "./components/LoginCheck";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { djello } from "./reducers";

let store = createStore(djello, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <LoginCheck />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
