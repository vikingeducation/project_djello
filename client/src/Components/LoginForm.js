import React, { PropTypes } from "react";
import TextField from "material-ui/TextField";

const LoginForm = props => {
  console.log("props = ", props);
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
          <label htmlFor="username">username</label>
          <TextField
            id="username"
            name="username"
            value={username}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          {/* <input name="password" value={password} onChange={onChangeInput} /> */}
          <TextField
            id="password"
            name="password"
            value={password}
            onChange={onChangeInput}
          />
        </div>
        {/* <input name="username" value={username} onChange={onChangeInput} /> */}

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
