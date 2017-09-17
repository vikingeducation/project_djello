import React, { PureComponent } from "react";

import { connect } from "react-redux";
import Login from "../components/Login";
import { userActions } from "../actions";

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

  onLogIn = () => {
    this.props.logIn(this.state);
  };

  onSignUp = () => {
    this.props.signUp(this.state);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Login
        {...this.state}
        onLogIn={this.onLogIn}
        onSignUp={this.onSignUp}
        onChange={this.onChange}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: credentials => dispatch(userActions.credentialAuth(credentials)),
    signUp: credentials => dispatch(userActions.register(credentials)),
    tokenAuth: () => dispatch(userActions.tokenAuth())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
