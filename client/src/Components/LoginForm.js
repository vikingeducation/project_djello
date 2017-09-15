import React, { PropTypes } from "react";
import TextField from "material-ui/TextField";

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
    <div>
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

        <button>Submit</button>
      </form>
    </div>
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
