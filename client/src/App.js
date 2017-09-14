import React, { Component } from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import LoginContainer from "./Containers/LoginContainer";
import BoardsContainer from "./Containers/BoardsContainer";
import LoggedIn from "./Components/elements/LoggedIn";
import LoggedOut from "./Components/elements/LoggedOut";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    // const testing = <p>Testing</p>;
    console.log("state in app = ", this.props);

    // const user = this
    return (
      <Router>
        <div className="App">
          <h1>App</h1>
          <p>user: {this.props.user.username}</p>
          {/* if logged in */}
          <LoggedIn user={this.props.user.loggedIn}>
            <Switch>
              <Route exact path="/" component={BoardsContainer} />
            </Switch>
          </LoggedIn>
          {/* if not logged in */}
          <LoggedOut user={this.props.user.loggedIn}>
            <LoginContainer />
          </LoggedOut>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps, null)(App);
