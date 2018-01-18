// Import the connect function from React-Redux
import { connect } from "react-redux";
// Import serialize to get the serialized form data
import serialize from "form-serialize";
import { login } from "../actions";
// Import the presentational component
import Login from "../components/User/Login";
import { withRouter } from "react-router";

// Map dispatch to props to create a submit function that
// dispatches creating a user
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      console.log(data);
      dispatch(login(data));
      form.reset();
    }
  };
};

// Generate the LoginContainer which renders Login
// with all the new props. We don't need to map state to
// props so we just send `null` in its place.
const LoginContainer = withRouter(connect(null, mapDispatchToProps)(Login));

export default LoginContainer;
