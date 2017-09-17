import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../actions";
import Dashboard from "../components/Dashboard";
import { withRouter } from "react-router-dom";
import { getAuthenticatedUser } from "../actions";

class DashboardContainer extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!this.props.user && localStorage.getItem("token")) {
      this.props.getAuthenticatedUser(token);
    }
  }

  render() {
    return <Dashboard {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
    getAuthenticatedUser: token => dispatch(getAuthenticatedUser(token))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
);
