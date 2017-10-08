import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";

//Components
import LoginContainer from "./Containers/LoginContainer";
import BoardsIndexContainer from "./Containers/BoardsIndexContainer";
import BoardShowContainer from "./Containers/BoardShowContainer";
import Appbar from "./Components/Appbar";
import LoggedIn from "./Components/elements/LoggedIn";
import LoggedOut from "./Components/elements/LoggedOut";
//Actions
import { logoutUser, getSession, DJELLO_SESSION } from "./actions/user";

//random styles
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
  }
  componentWillMount = async () => await this.sessionLogin();
  sessionLogin = async () => {
    console.log(localStorage.getItem(DJELLO_SESSION));
    console.log("sessionLogin ", this.props);
    let session = localStorage.getItem(DJELLO_SESSION);
    if (session) await this.props.getSession(session);
  };
  onLogout = e => {
    this.props.logoutUser();
  };
  onLogin = e => {
    //do a thing
  };
  render = () => {
    const loggedIn = this.props.user;
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
              </LoggedOut>
            </div>
          </div>
        </div>
      </Router>
    );
  };
}

const mapStateToProps = state => {
  console.log("app state = ", state);
  return {
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
    getSession: session => dispatch(getSession(session))
  };
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
