import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
// import constants from "../containers/LoginFormContainer";
import LoginContainer from "../containers/LoginContainer";
import BoardContainer from "../containers/BoardContainer";
import BoardExample from "../components/BoardExample";
// import Board from "./Dashboard";

// Material UI setup
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
  deepPurple100,
  deepPurple200,
  deepPurple300,
  deepPurple400
} from "material-ui/styles/colors";

import Navbar from "./Navbar";

// needed for onTouchTap (another property???)
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepPurple400,
    primary2Color: deepPurple200,
    accent1Color: deepPurple400
  },
  appBar: {
    height: 50
  }
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null
    };
  }

  componentWillMount() {
    const { cookies } = this.props;

    this.state = {
      token: cookies.get("token")
    };
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/board" component={BoardContainer} />
              <Route exact path="/" component={BoardExample} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default withCookies(App);
