import React from "react";
import { connect } from "react-redux";
import validateUser from "../actions/user";
import { validateForm, validateEmail, validatePassword } from "../helpers.js";
import LoginForm from "../Components/LoginForm";

import Showable from "../Components/elements/Showable";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   user: null,
    //   isFetching: false,
    //   error: null,
    //   test: "testing"
    // };
    this.state = {
      success: false,
      errors: {},
      email: "",
      password: ""
    };
  }
  inputValidationHash = {
    email: validateEmail,
    password: validatePassword
  };
  onChangeInput = async e => {
    let inputName = e.target.name;
    this.setState({ [e.target.name]: e.target.value }, () => {
      let validateErrors = this.inputValidationHash[inputName]({
        [inputName]: this.state[inputName]
      });
      if (validateErrors) {
        this.setState({
          errors: {
            ...this.state.errors,
            [inputName]: validateErrors[inputName]
          }
        });
      } else {
        let error = this.state.errors;
        delete error[inputName];
        this.setState({
          errors: error
        });
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let validateErrors;
    if (!(validateErrors = validateForm(this.state))) {
      this.formSuccess();
    } else {
      this.formError(validateErrors);
    }
  };

  formSuccess = () => {
    this.setState(
      {
        success: true,
        errors: {},
        exampleEmail: "",
        examplePassword: "",
        exampleURL: ""
      },
      () => console.log("Success!")
    );
  };

  formError = errors => {
    this.setState(
      {
        success: false,
        errors: errors
      },
      () => console.log("Errors!!")
    );
  };
  render() {
    console.log("lContainer state = ", this.state);
    console.log("lContainer props = ", this.props);
    const loading = (
      <div>
        <p>Loading.....</p>
      </div>
    );
    return (
      <Showable isFetching={this.props.isFetching} loadScreen={loading}>
        <div>
          <h1>Login Component</h1>
        </div>
        <div>
          <LoginForm
            onSubmit={this.onSubmit}
            onChangeInput={this.onChangeInput}
            {...this.state}
          />
        </div>
      </Showable>
    );
  }
}

const mapStateToProps = state => {
  console.log("state = ", state);
  return {
    isFetching: state.user.isFetching,
    error: state.user.error,
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    validateUser: () => {
      const test = {
        username: "Bob",
        password: "blaahhh"
      };
      dispatch(validateUser(test));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
