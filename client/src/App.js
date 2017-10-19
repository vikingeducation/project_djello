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
import {
  logout,
  getSession,
  DJELLO_SESSION_USERNAME,
  DJELLO_SESSION_ACCESSTOKEN
} from "./actions/user";

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
    this.state = {
      loggedIn: undefined
    };
  }
  componentWillMount = async () => this.sessionLogin();

  componentWillReceiveProps = props => {
    if (this.props.user !== props.user) {
      console.log("user changed");
      this.setState({ loggedIn: props.user.loggedIn });
    }
    if (!this.state.loggedIn && this.props.user !== props.user) {
      console.log("user changed");
      if (props.user.loggedIn) this.setState({ loggedIn: true });
    }
  };
  sessionLogin = async () => {
    let session = {
      username: localStorage.getItem(DJELLO_SESSION_USERNAME),
      accessToken: localStorage.getItem(DJELLO_SESSION_ACCESSTOKEN)
    };
    if (session.username && session.accessToken)
      await this.props.getSession(session);
    if (!(session.username && session.accessToken))
      this.setState({ loggedIn: false });
  };
  onLogout = e => {
    this.props.logoutUser();
  };
  render = () => {
    //my handling of log in things
    let needToLogin;
    if (this.state.loggedIn === undefined) {
      return <div>Logging You In Now</div>;
    } else if (this.state.loggedIn === false) {
      needToLogin = true;
    } else if (this.state.loggedIn === true) {
      needToLogin = false;
    }
    return (
      <Router>
        <div className="App">
          {/* <Dashboard /> */}
          <div style={appBarStyle}>
            <Appbar loggedIn={!needToLogin} onLogout={this.onLogout} />
          </div>
          <div style={contentStyle}>
            {/* if logged in */}
            <LoggedIn user={!needToLogin}>
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
              <LoggedOut user={!needToLogin}>
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
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logout());
    },
    logout: () => dispatch(logout()),
    getSession: session => dispatch(getSession(session))
  };
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
