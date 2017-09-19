//TODO: REMOVE PERF PROFILER BEFORE build
//REACT
import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";

//REACT-REDUX
import { Provider } from "react-redux";

//MATERIAL-UI
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
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
// registerServiceWorker();

// const TESTING = true;
// export TESTING
