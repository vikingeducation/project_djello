import React from "react";
import PropTypes from "prop-types";
import Input from "./../elements/Input";
import InputGroup from "./../elements/InputGroup";
import Button from "./../elements/Button";

const AddUser = ({ onSubmit }) => (
  <form className="container" onSubmit={onSubmit}>
    <h1>
      Sign Up!{" "}
      <span className="glyphicon glyphicon-search" aria-hidden="true" />
    </h1>
    <InputGroup name="firstName" labelText="First Name">
      <Input name="firstName" />
    </InputGroup>
    <InputGroup name="lastName" labelText="Last Name">
      <Input name="lastName" />
    </InputGroup>
    <InputGroup name="email" labelText="Email">
      <Input name="email" />
    </InputGroup>
    <InputGroup name="password" labelText="Password">
      <Input name="password" />
    </InputGroup>
    <Button type="submit" color="primary">
      Sign Up
    </Button>
  </form>
);

AddUser.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AddUser;
