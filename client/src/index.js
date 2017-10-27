//TODO: REMOVE PERF PROFILER BEFORE build
//REACT
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "./App";

//REACT-REDUX
import { Provider } from "react-redux";

//MATERIAL-UI
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

import PerfProfiler from "./Components/PerfProfiler";

import store from "./Store/store";

import {
  cyan500,
  cyan700,
  pinkA200,
  grey100,
  grey300,
  grey400,
  grey500,
  white,
  darkBlack,
  fullBlack,
  lime200
} from "material-ui/styles/colors";

const theme = getMuiTheme({
  palette: {
    primary1Color: "#39a939",
    primary2Color: "#8cdc8c",
    primary3Color: "#5cc45c",
    accent1Color: "#99c542",
    accent2Color: "#d6f39b",
    accent3Color: "#bce46c",
    textColor: darkBlack,
    secondaryTextColor: "#eee",
    alternateTextColor: "#eee",
    canvasColor: lime200
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={theme}>
      <div>
        {/* <PerfProfiler /> */}
        <AppContainer />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
