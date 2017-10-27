import React, { PropTypes } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import globalStyles from "../styles/style.css";

// import { ctaButton } from "../styles/styles.js";

const style = {
  margin: 12
};
// console.log(`ctaButton = ${ctaButton.color}`);
const LoginForm = props => {
  const { onSubmit, onChangeInput, username, password } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username" />
        <TextField
          id="username"
          name="username"
          hintText="Username"
          floatingLabelText="Username"
          value={username}
          onChange={onChangeInput}
        />
      </div>
      <div>
        <label htmlFor="password" />

        <TextField
          id="password"
          name="password"
          hintText="Password"
          floatingLabelText="Password"
          value={password}
          onChange={onChangeInput}
        />
      </div>
      <FlatButton label="Login" className="ctaButton" onClick={onSubmit} />
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  success: PropTypes.bool,
  errors: PropTypes.object
};

LoginForm.defaultProps = {
  errors: {}
};

export default LoginForm;
