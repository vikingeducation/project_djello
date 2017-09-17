import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../actions";
import Dashboard from "../components/Dashboard";
import { withRouter } from "react-router-dom";
import { getAuthenticatedUser } from "../actions";

class DashboardContainer extends Component {
  componentDidMount() {
    const token = window.localStorage.getItem("token");
    console.log(this.props);
    console.log(window.localStorage.getItem("token"));
    if (!this.props.user && window.localStorage.getItem("token")) {
      console.log("i think this worked?");
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
