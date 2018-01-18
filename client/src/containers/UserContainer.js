// Import the connect function from React-Redux
import { connect } from "react-redux";
// Import serialize to get the serialized form data
import serialize from "form-serialize";
import { userAdd } from "../actions";
// Import the presentational component
import AddUser from "../components/User/AddUser";
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
      dispatch(userAdd(data));
      form.reset();
    }
  };
};

// Generate the AddUserContainer which renders AddUser
// with all the new props. We don't need to map state to
// props so we just send `null` in its place.
const AddUserContainer = withRouter(connect(null, mapDispatchToProps)(AddUser));

export default AddUserContainer;
