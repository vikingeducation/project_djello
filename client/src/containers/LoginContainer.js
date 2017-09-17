import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { userActions } from "../actions";
import Login from "../components/Login";
import BoardContainer from "../containers/BoardContainer";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  async componentDidMount() {
    await this.props.tokenAuth();
  }

  clear = () => this.setState({ username: "", password: "" });

  onLogIn = () => {
    this.props.logIn(this.state);
    this.clear();
  };

  onSignUp = () => {
    this.props.signUp(this.state);
    this.clear();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.props.user.username) {
      return (
        <Switch>
          <Route path="/boards/:id?" component={BoardContainer} />
          <Redirect from="/" to="/boards" />
        </Switch>
      );
    } else {
      return (
        <Login
          {...this.state}
          loading={this.props.user.authenticating}
          onLogIn={this.onLogIn}
          onSignUp={this.onSignUp}
          onChange={this.onChange}
        />
      );
    }
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  logIn: credentials => dispatch(userActions.credentialAuth(credentials)),
  signUp: credentials => dispatch(userActions.register(credentials)),
  tokenAuth: () => dispatch(userActions.tokenAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
