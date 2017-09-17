import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { userActions } from "../actions";
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
          <Route path="/boards/:id?" component={BoardContainer} />
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
  logIn: credentials => dispatch(userActions.credentialAuth(credentials)),
  signUp: credentials => dispatch(userActions.register(credentials)),
  tokenAuth: () => dispatch(userActions.tokenAuth())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
