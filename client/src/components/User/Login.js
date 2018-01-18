import React from "react";
import PropTypes from "prop-types";
import Input from "./../elements/Input";
import InputGroup from "./../elements/InputGroup";
import Button from "./../elements/Button";

const Login = ({ onSubmit }) => (
  <form className="container" onSubmit={onSubmit}>
    <h1>
      Login! <span className="glyphicon glyphicon-search" aria-hidden="true" />
    </h1>
    <InputGroup name="email" labelText="Email">
      <Input name="email" />
    </InputGroup>
    <InputGroup name="password" labelText="Password">
      <Input name="password" />
    </InputGroup>
    <Button type="submit" color="primary">
      Login
    </Button>
  </form>
);

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Login;
