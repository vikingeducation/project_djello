import React from "react";
import PropTypes from "prop-types";
import Input from "./../elements/Input";
import InputGroup from "./../elements/InputGroup";
import Button from "./../elements/Button";

const CreateBoard = ({ onSubmit, user }) => (
  <form className="container" onSubmit={onSubmit}>
    <h1>
      Create Board for {user.firstName}{" "}
      <span className="glyphicon glyphicon-search" aria-hidden="true" />
    </h1>
    <InputGroup name="name" labelText="Board Name">
      <Input name="name" />
    </InputGroup>
    <Input name="userId" type="hidden" value={user.id} />
    <Button type="submit" color="primary">
      Create Board
    </Button>
  </form>
);

CreateBoard.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CreateBoard;
