import React from "react";
import { connect } from "react-redux";
import validateUser from "../actions/user";
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
  }
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
