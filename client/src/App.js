import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "./actions/user";

import { BrowserRouter as Router } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginContainer from "./Containers/LoginContainer";
import BoardsIndexContainer from "./Containers/BoardsIndexContainer";
import BoardShowContainer from "./Containers/BoardShowContainer";
import Appbar from "./Components/Appbar";
import LoggedIn from "./Components/elements/LoggedIn";
import LoggedOut from "./Components/elements/LoggedOut";

export const appBarStyle = {
  position: "fixed",
  height: "80px",
  zIndex: "1",
  top: 0,
  left: 0,
  width: "100%"
};
export const contentStyle = {
  position: "absolute",
  top: appBarStyle.height,
  height: "100%",
  width: "100%",
  left: "0px"
};

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
    console.log("loggedIn = ", loggedIn, ", user = ", this.props.user);
    return (
      <Router>
        <div className="App">
          {/* <Dashboard /> */}
          <div style={appBarStyle}>
            <Appbar
              loggedIn={loggedIn}
              onLogin={this.onLogin}
              onLogout={this.onLogout}
            />
          </div>
          <div style={contentStyle}>
            {/* if logged in */}
            <LoggedIn user={loggedIn}>
              <Switch>
                {/* boards index page */}
                <Route exact path="/" component={BoardsIndexContainer} />
                {/* board show page */}
                <Route path="/boards/:id" component={BoardShowContainer} />
                {/* not found */}
                <Route render={() => <h1>Page not found</h1>} />
              </Switch>
            </LoggedIn>
            {/* if not logged in */}
            <div id="formContainer" className="flex-center">
              <LoggedOut user={loggedIn}>
                <Switch>
                  <Route exact path="/" component={LoginContainer} />
                  <Route path="*" render={() => <Redirect to="/" />} />
                </Switch>
                {/* <LoginContainer /> */}
              </LoggedOut>
            </div>
          </div>
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

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
