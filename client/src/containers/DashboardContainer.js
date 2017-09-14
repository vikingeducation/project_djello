import { connect } from "react-redux";
import { logOut } from "../actions";
import Dashboard from "../components/Dashboard";

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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
