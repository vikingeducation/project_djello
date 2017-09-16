import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "./actions/user";

//testing var
// import { TESTING } from "./index";

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import LoginContainer from "./Containers/LoginContainer";
import BoardsContainer from "./Containers/BoardsContainer";
import Appbar from "./Components/Appbar";
import LoggedIn from "./Components/elements/LoggedIn";
import LoggedOut from "./Components/elements/LoggedOut";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  onLogout = e => {
    //do a thing
    console.log("logout = ", e);
    console.log("this = ", this);
    this.props.logoutUser();
  };
  onLogin = e => {
    //do a thing
  };
  render = () => {
    console.log("state in app = ", this.props);
    // console.log("TESTING = ", TESTING);
    // const loggedIn = TESTING ? true : this.props.user.loggedIn;
    const loggedIn = this.props.user.loggedIn;
    return (
      <Router>
        <div className="App">
          {/* <Dashboard /> */}
          <Appbar
            loggedIn={loggedIn}
            onLogin={this.onLogin}
            onLogout={this.onLogout}
          />
          <h1>App</h1>
          <p>user: {this.props.user.username}</p>
          {/* if logged in */}
          <LoggedIn user={loggedIn}>
            <Switch>
              <Route
                exact
                path="/"
                user={this.props.user}
                component={BoardsContainer}
              />
            </Switch>
          </LoggedIn>
          {/* if not logged in */}
          <LoggedOut user={loggedIn}>
            <LoginContainer />
          </LoggedOut>
        </div>
      </Router>
    );
  };
}

const mapStateToProps = state => {
  return {
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
