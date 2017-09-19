import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { authenticate, tokenAuth } from "../socket";
import Login from "../components/Login";
import BoardContainer from "../containers/BoardContainer";

class LoginContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    this.props.tokenAuth();
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

  actions = {
    onLogIn: this.onLogIn,
    onSignUp: this.onSignUp,
    onChange: this.onChange
  };

  render() {
    if (this.props.user.username) {
      return (
        <Switch>
          <Route path="/boards/:slug?" component={BoardContainer} />
          <Redirect from="/" to="/boards" />
        </Switch>
      );
    } else {
      return (
        <Login
          {...this.state}
          loading={this.props.user.authenticating}
          message={this.props.user.authMessage}
          actions={this.actions}
        />
      );
    }
  }
}

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  logIn: credentials => dispatch(authenticate(credentials)),
  signUp: credentials =>
    dispatch(authenticate({ ...credentials, register: true })),
  tokenAuth: () => dispatch(tokenAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
