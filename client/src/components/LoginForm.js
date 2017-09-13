import React, { Component } from "react";

import { emailValidation, passwordLengthValidation } from "../services";
import { RaisedButton, TextField } from "material-ui";
import swal from "sweetalert2";

// import { NavLink } from "react-router-dom";

export default class Form extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  onChangeInput = e => {
    let text = e.target.value;

    this.setState({
      [e.target.name]: text
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const errors = [emailValidation(email), passwordLengthValidation(password)]
      .filter(error => !!error)
      .join(" ");

    !errors.length
      ? swal({
          title: "Success",
          type: "success"
        })
      : swal({
          title: "Errors",
          type: "error",
          html: `<div>${errors}</div>`
        });
  };

  render() {
    return (
      <form onSubmit={this.onSubmitForm}>
        <br />
        <div>
          <TextField
            floatingLabelText="email"
            name="email"
            onChange={this.onChangeInput}
            value={this.state.email}
          />
          <br />
          <TextField
            floatingLabelText="password"
            name="password"
            type="password"
            onChange={this.onChangeInput}
            value={this.state.password}
          />
          <br />
          <br />
          <RaisedButton label="Sign In" type="submit" secondary={true} />
          {/* <NavLink className="nav-link" exact to="/register">
            or register first
          </NavLink> */}
        </div>
      </form>
    );
  }
}
