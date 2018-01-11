import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { createUser } from "../actions";

class User extends Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createUser: () => {
      dispatch(createUser());
    }
  };
};

const UserContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(User)
);
export default UserContainer;
