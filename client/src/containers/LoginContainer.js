import React, { Component } from "react";
import { connect } from "react-redux";
import serialize from "form-serialize";
import { withRouter } from "react-router-dom";

import { UserActions } from "../actions";
import Login from "../components/Login";
import { BASE_URL } from "../actions/constants";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error_email: null,
      error_password: null
    };
  }

  componentWillMount() {
    this.props.loggedOutOnly();
  }

  onSubmitForm = async e => {
    e.preventDefault();
    const userData = serialize(e.target, { hash: true });
    let url = `${BASE_URL}/users/login`;
    let result;
    try {
      result = await fetch(url, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userData)
      });

      result = await result.json();

      if (!result.error && result._id && result.email) {
        this.props.history.push("/board");
      }

      if (result.error) {
        this.setState({
          error_email: null,
          error_password: null,
          [result.error.name]: result.error.message
        });
      }
    } catch (error) {
      throw error;
    }
  };

  render() {
    return (
      <Login
        onSubmitForm={this.onSubmitForm}
        error_email={this.state.error_email}
        error_password={this.state.error_password}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    UsersReducers: state.UsersReducers
  };
};

const mapDispatchToProps = dispatch => ({
  userLogin: userData => {
    dispatch(UserActions.userLogin(userData));
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
);
