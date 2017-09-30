//TODO: REMOVE PERF PROFILER BEFORE build
//REACT
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//REACT-REDUX
import { Provider } from "react-redux";

//MATERIAL-UI
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

import PerfProfiler from "./Components/PerfProfiler";

import store from "./Store/store";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        {/* <PerfProfiler /> */}
        <App />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
