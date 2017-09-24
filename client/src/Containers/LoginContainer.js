import React from "react";
import { connect } from "react-redux";
import { validateUser } from "../actions/user";
import { validateForm, validateEmail, validatePassword } from "../helpers.js";
import LoginForm from "../Components/LoginForm";
import Paper from "material-ui/Paper";

import Showable from "../Components/elements/Showable";

const centerForm = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center"
};
const style = {
  height: 200,
  width: 200,
  margin: 20,
  textAlign: "center"
};

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
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    let validateErrors;
    this.formSuccess();
  };

  formSuccess = () => {
    //attempt to login with formdata
    //pull user off the state
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.validateUser(user);
    //reset the form
    this.setState({
      success: true,
      errors: {},
      username: "",
      password: "",
      email: ""
    });
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
        <Paper style={centerForm}>
          {/* <Paper style={style} zDepth={3}> */}
          <h1>Login</h1>
          <h4>Much Djello'ing awaits!</h4>
          <LoginForm
            onSubmit={this.onSubmit}
            onChangeInput={this.onChangeInput}
            {...this.state}
          />
          {/* </Paper> */}
        </Paper>
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
