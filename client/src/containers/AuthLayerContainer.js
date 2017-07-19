import { connect } from "react-redux";
import AuthLayer from "../components/AuthLayer";
import { loginUser } from "../actions/auth";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: e => {
      e.preventDefault();
      dispatch(loginUser());
    }
  }
}

const AuthLayerContainer = connect(mapStateToProps, mapDispatchToProps)(AuthLayer);

export default AuthLayerContainer;