import React, { PropTypes } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

const style = {
  margin: 12
};

const LoginForm = props => {
  const {
    onSubmit,
    onChangeInput,
    success,
    errors,
    username,
    password
  } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username" />
        <TextField
          id="username"
          name="username"
          hintText="username"
          floatingLabelText="username"
          value={username}
          onChange={onChangeInput}
        />
      </div>
      <div>
        <label htmlFor="password" />

        <TextField
          id="password"
          name="password"
          hintText="password"
          floatingLabelText="password"
          value={password}
          onChange={onChangeInput}
        />
      </div>

      <RaisedButton
        label="Login"
        primary={true}
        style={style}
        onClick={onSubmit}
      />
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
