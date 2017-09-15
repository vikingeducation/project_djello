//TODO: REMOVE PERF PROFILER BEFORE build

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

//REACT-REDUX
import { Provider } from "react-redux";

//REDUX
import user from "./reducers/user";
import { createStore, applyMiddleware, combineReducers } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

import PerfProfiler from "./Components/PerfProfiler";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        <PerfProfiler />
        <App />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
