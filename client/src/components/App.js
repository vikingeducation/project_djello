import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import LoginFormContainer from "../containers/LoginFormContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { green700 } from "material-ui/styles/colors";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green700
  },
  appBar: {
    height: 75
  }
});

const App = ({ state }) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      {!state.loggedIn
        ? <LoginFormContainer />
        : <Router>
            <Dashboard />
          </Router>}
    </MuiThemeProvider>
  );
};

export default App;
