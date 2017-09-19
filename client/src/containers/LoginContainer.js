import React, { Component } from "react";
import { connect } from "react-redux";
import serialize from "form-serialize";
// import { withRouter } from "react-router-dom";

import { UserActions } from "../actions";
import Login from "../components/Login";
import { BASE_URL } from "../actions/constants";
// import io from "socket.io-client";

class LoginContainer extends Component {
  constructor() {
    super();
    this.state = {
      error_email: null,
      error_password: null
    };
  }

  componentWillMount() {
    console.log("this.props: ", this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log("this.props: ", this.props);
  }

  onSubmitForm = async e => {
    e.preventDefault();
    const userData = serialize(e.target, { hash: true });
    let url = `${BASE_URL}/users/login`;
    let result;
    try {
      result = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(userData)
      });
    } catch (error) {
      throw error;
    }
  };

  onSubmitLogin = async e => {
    e.preventDefault();
    let url = `${BASE_URL}/users/authenticate`;
    let result;
    try {
      result = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      result = await result.json();
      console.log("result: ", result);
      if (!result.error) {
        this.props.history.push("/");
      }
    } catch (error) {
      throw error;
    }
  };

  render() {
    return (
      <Login
        onSubmitForm={this.onSubmitForm}
        onSubmitLogin={this.onSubmitLogin}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
