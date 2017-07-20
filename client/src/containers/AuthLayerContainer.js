import { connect } from "react-redux";
import AuthLayer from "../components/AuthLayer";
import serialize from "form-serialize";
import { loginUser } from "../actions/auth";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    authError: state.user.error,
    token: state.user.token,
    userId: state.user.id,
    specificBoard: state.specificBoard.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: e => {
      e.preventDefault();
      const form = e.target;
      const creds = serialize(form, { hash: true });
      dispatch(loginUser(creds));
    }
  };
};

const AuthLayerContainer = connect(mapStateToProps, mapDispatchToProps)(
  AuthLayer
);

export default AuthLayerContainer;
