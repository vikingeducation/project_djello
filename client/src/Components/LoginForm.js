import React, { PropTypes } from "react";

const LoginForm = ({
  onSubmit,
  onChangeInput,
  success,
  errors,
  email,
  password
}) => (
  <div>
    <form onSubmit={onSubmit}>
      <label for="email">Email</label>
      <input name="email" value={password} onChange={onChangeInput} />
      <label for="email">Password</label>
      <input name="email" value={password} onChange={onChangeInput} />
      <button>Submit</button>
    </form>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  success: PropTypes.bool,
  errors: PropTypes.object
};

LoginForm.defaultProps = {
  errors: {}
};

export default LoginForm;
