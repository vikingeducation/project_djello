import React from "react";
import { connect } from "react-redux";
import validateUser from "../actions/user";
import { validateForm, validateEmail, validatePassword } from "../helpers.js";
import LoginForm from "../Components/LoginForm";

import Showable from "../Components/elements/Showable";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      errors: {},
      username: "",
      password: "",
      email: ""
    };
  }
  inputValidationHash = {
    email: validateEmail,
    password: validatePassword
  };
  onChangeInput = async e => {
    let inputName = e.target.name;
    this.setState({ [e.target.name]: e.target.value }, () => {
      // let validateErrors = this.inputValidationHash[inputName]({
      //   [inputName]: this.state[inputName]
      // });
      // if (validateErrors) {
      //   this.setState({
      //     errors: {
      //       ...this.state.errors,
      //       [inputName]: validateErrors[inputName]
      //     }
      //   });
      // } else {
      //   let error = this.state.errors;
      //   delete error[inputName];
      //   this.setState({
      //     errors: error
      //   });
      // }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let validateErrors;
    this.formSuccess();
    //VALIDATION DISABLED FOR TESTING
    // if (!(validateErrors = validateForm(this.state))) {
    //   this.formSuccess();
    // } else {
    //   this.formError(validateErrors);
    // }
  };

  formSuccess = () => {
    //attempt to login with formdata
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.validateUser(user);
    this.setState(
      {
        success: true,
        errors: {},
        username: "",
        password: "",
        email: ""
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
  return {
    isFetching: state.user.isFetching,
    error: state.user.error,
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    validateUser: user => {
      dispatch(validateUser(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
