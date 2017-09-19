import React from "react";
import LoginForm from "../components/LoginForm";
import { fetchUser } from "../redux/users/actions";
import { connect } from "react-redux";

class LoginFormContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      usernameInputValue: "",
      passwordInputValue: ""
    };
  }

  handleInputChange = e => {
    this.setState({
      [`${e.target.name}InputValue`]: e.target.value
    });
  };

  handleButtonClick = async () => {
    this.props.getUser({
      email: this.state.usernameInputValue,
      password: this.state.passwordInputValue
    });
  };

  render() {
    const { userNotFound } = this.props;
    return (
      <LoginForm
        {...this.state}
        userNotFound={userNotFound}
        onInputChange={this.handleInputChange}
        onButtonClick={this.handleButtonClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userNotFound: state.userNotFound
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: ({ email, password }) => {
      dispatch(
        fetchUser({
          email,
          password
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
