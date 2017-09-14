import React, { PropTypes } from "react";

const LoginForm = props => {
  console.log("props = ", props);
  const { onSubmit, onChangeInput, success, errors, email, password } = props;
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label for="email">Email</label>
        <input name="email" value={email} onChange={onChangeInput} />
        <label for="password">Password</label>
        <input name="password" value={password} onChange={onChangeInput} />
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
