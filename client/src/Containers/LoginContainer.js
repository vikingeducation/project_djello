import React from "react";
import { connect } from "react-redux";

//Components
import Showable from "../Components/elements/Showable";
import LoginForm from "../Components/LoginForm";
import Paper from "material-ui/Paper";

//Actions
import { validateUser } from "../actions/user";

//Random Styles
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
  onChangeInput = async e => {
    let inputName = e.target.name;
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    //validate input
    /////
    //attempt to login the user
    this.props.validateUser(user);
    this.setState({
      success: true,
      errors: {},
      username: "",
      password: "",
      email: ""
    });
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
          <h1>Login</h1>
          <h4>Much Djello'ing awaits!</h4>
          <LoginForm
            onSubmit={this.onSubmit}
            onChangeInput={this.onChangeInput}
            {...this.state}
          />
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
