import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardContainer from "../containers/DashboardContainer";
import LoginFormContainer from "../containers/LoginFormContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { green700 } from "material-ui/styles/colors";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green700
  }
});

// Material-ui wrapper for the theme. Basic conditional logic checking
// if the user's logged in and renders either the Dashboard or the Login screen
const App = props =>
  <MuiThemeProvider muiTheme={muiTheme}>
    {!props.user.loggedIn
      ? <LoginFormContainer />
      : <Router>
          <DashboardContainer {...props} />
        </Router>}
  </MuiThemeProvider>;

export default App;
