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
  },
  appBar: {
    height: 50
  }
});

const App = ({ state }) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      {!state.loggedIn
        ? <LoginFormContainer />
        : //wrap each component in a pagecontainer that checks localStorage on each time
          <Router>
            <DashboardContainer {...state} />
          </Router>}
    </MuiThemeProvider>
  );
};

export default App;
