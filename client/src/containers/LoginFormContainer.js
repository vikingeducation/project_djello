import React, { Component } from "react";
import { login } from "../actions";
import { LoginForm } from "../components/LoginForm";
import { connect } from "react-redux";
// import { validateForm, validatePassword } from "../services/formValidator";

class LoginFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleInputChange = (e, value) => {
    this.setState({
      [e.target.name]: value
    });
  };

  render() {
    return (
      <LoginForm
        {...this.props}
        {...this.state}
        handleInputChange={this.handleInputChange}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    loginFailureMessage: state.loginFailureMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => {
      dispatch(login(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
