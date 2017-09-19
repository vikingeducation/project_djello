import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../actions";
import Dashboard from "../components/Dashboard";
import { withRouter } from "react-router-dom";
import { getAuthenticatedUser } from "../actions";
import CircularProgress from "material-ui/CircularProgress";
import Drawer from "material-ui/Drawer";

class DashboardContainer extends Component {
  state = {
    drawerOpen: false
  };

  // On mount, checks for token on localStorage. If there is, but there isn't
  // a user, like in the case of a page refresh, it pings the server using the
  // token to populate the user object
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!this.props.user && localStorage.getItem("token")) {
      this.props.getAuthenticatedUser(token);
    }
  }

  handleDrawerOpen = () =>
    this.setState({ drawerOpen: !this.state.drawerOpen });

  render() {
    return (
      <div>
        {this.props.fetching
          ? <CircularProgress />
          : <Dashboard
              {...this.props}
              state={this.state}
              handleDrawerOpen={this.handleDrawerOpen}
            />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
    getAuthenticatedUser: token => dispatch(getAuthenticatedUser(token))
  };
};

export default withRouter(
  connect(null, mapDispatchToProps)(DashboardContainer)
);
