import React, { Component } from "react";
import { connect } from "react-redux";
import serialize from "form-serialize";
// import { bindActionCreators } from "redux";

import { UserActions } from "../actions";
import Login from "../components/Login";
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

  onSubmitForm = e => {
    e.preventDefault();
    const data = serialize(e.target, { hash: true });
    this.props.userLogin({ email: data.email, password: data.password });

    // this.socket.emit("login", {
    //   email: this.state.email,
    //   password: this.state.password
    // });
  };

  render() {
    return <Login onSubmitForm={this.onSubmitForm} />;
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
