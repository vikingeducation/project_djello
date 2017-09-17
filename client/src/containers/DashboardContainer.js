import { connect } from "react-redux";
import { logOut } from "../actions";
import Dashboard from "../components/Dashboard";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
