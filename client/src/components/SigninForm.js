import React from "react";
import PropTypes from "prop-types";
import Input from "../components/elements/Input";
import InputGroup from "../components/elements/InputGroup";
import Button from "../components/elements/Button";
import { Link } from "react-router-dom";

const SigninForm = ({ onSubmit, title, button1, button2, linkTo }) => {
  return (
    <div className="container signinform">
      <div className="row">
        <div className="col">
          <h3>{title}</h3>
          <form onSubmit={onSubmit}>
            <InputGroup labelText="Username">
              <Input name="username" placeholder="Username" />
            </InputGroup>
            <InputGroup labelText="Password">
              <Input name="password" type="password" placeholder="Password" />
            </InputGroup>
            <Button type="submit" color="primary">
              {button1}
            </Button>{" "}
            <Link to={linkTo}>
              <Button color="success">{button2}</Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

SigninForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired
};

export default SigninForm;
