import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import LoginFormContainer from "../containers/LoginFormContainer";
import Protected from "./Protected";
import BoardsMenuContainer from "../containers/BoardsMenuContainer";
import BoardContainer from "../containers/BoardContainer";

class App extends Component {
  render() {
    const { user, selectedBoard } = this.props;
    return (
      <Router>
        <div>
          <Protected exclusion="/login" condition={!user.email}>
            <Redirect to="/login" />
          </Protected>
          <Protected exclusion="/main" condition={user.email}>
            <Redirect to="/main" />
          </Protected>
          <Switch>
            <Route exact path="/login" component={LoginFormContainer} />
            <Route
              exact
              path="/main"
              component={selectedBoard ? BoardContainer : BoardsMenuContainer}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    selectedBoard: state.selectedBoard
  };
};

export default connect(mapStateToProps, null)(App);
