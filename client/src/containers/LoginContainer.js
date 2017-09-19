import React, { Component } from "react";
import { connect } from "react-redux";
import serialize from "form-serialize";
// import { bindActionCreators } from "redux";

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

  componentDidMount() {
    // console.log(this.props);
    // this.socket = io("http://localhost:3001");
    // this.socket.on("isValidUser", isValidUser => {
    //   let userInfo;
    //   if (isValidUser.isValid) {
    //     userInfo = this.props.UsersReducers.usersData.find(user => {
    //       return user.email === isValidUser.email;
    //     });
    //   }
    //   if (userInfo) this.props.loginUser(userInfo);
    // });
  }

  // onChangeInput = e => {
  //   let text = e.target.value;
  //   this.setState({
  //     [e.target.name]: text
  //   });
  // };

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

      console.log("login result: ", result);
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
      console.log("authenticate result: ", result);
    } catch (error) {
      throw error;
    }
  };

  // this.props.userLogin({ email: data.email, password: data.password });

  // this.socket.emit("login", {
  //   email: this.state.email,
  //   password: this.state.password
  // });

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
