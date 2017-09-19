import React, { Component } from "react";

import { Route, Switch, withRouter } from "react-router-dom";
import LoginContainer from "../containers/LoginContainer";
import BoardContainer from "../containers/BoardContainer";
import BoardExample from "./BoardExample";
import DashBoard from "../containers/DashBoard";
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
import { BASE_URL } from "../actions/constants";

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
      email: null,
      _id: null,
      error: "currently not logged in"
    };
  }

  componentWillMount() {
    this.authenticate();
  }

  userFetchOperation = async operation => {
    let url = `${BASE_URL}/users/${operation}`;
    let result;
    try {
      result = await fetch(url, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      result = await result.json();

      await this.setState({
        email: result.email || null,
        _id: result._id || null,
        error: result.error || null
      });
    } catch (error) {
      await this.setState({
        error: `something went wrong during ${operation}`
      });
    }
  };

  authenticate = async () => {
    await this.userFetchOperation("authenticate");
  };

  logout = async () => {
    await this.userFetchOperation("logout");
    this.props.history.push("/login");
  };

  loggedInOnly = async () => {
    await this.authenticate();
    if (this.state.error || !this.state._id || !this.state.email) {
      this.props.history.push("/login");
    }
  };

  loggedOutOnly = async () => {
    await this.authenticate();
    if (!this.state.error && this.state._id && this.state.email) {
      this.props.history.push("/board");
    }
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Navbar loggedState={this.state} logout={this.logout} />
          <Switch>
            <Route
              exact
              path="/login"
              render={() =>
                <LoginContainer loggedOutOnly={this.loggedOutOnly} />}
            />
            <Route
              exact
              path="/board"
              render={() =>
                <BoardContainer
                  loggedInOnly={this.loggedInOnly}
                  email={this.state.email}
                  _id={this.state._id}
                />}
            />
            <Route
              exact
              path="/dashboard"
              render={() =>
                <DashBoard
                  loggedInOnly={this.loggedInOnly}
                  _id={this.state._id}
                />}
            />
            <Route exact path="/" component={BoardExample} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
