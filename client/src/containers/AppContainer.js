import { connect } from "react-redux";
import App from "../components/App";
import { logoutUser } from "../actions/auth";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    email: state.user.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: e => {
      e.preventDefault();
      dispatch(logoutUser());
    }
  }
}


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;