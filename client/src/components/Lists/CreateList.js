import React from "react";
import PropTypes from "prop-types";
import Input from "./../elements/Input";
import InputGroup from "./../elements/InputGroup";
import Button from "./../elements/Button";

const CreateList = ({ onSubmit, board }) => (
  <form className="container" onSubmit={onSubmit}>
    <h5>
      Create List for {board.name}{" "}
      <span className="glyphicon glyphicon-search" aria-hidden="true" />
    </h5>
    <InputGroup name="name" labelText="List Name">
      <Input name="name" />
    </InputGroup>
    <Input name="boardId" type="hidden" value={board.id} />
    <Button type="submit" color="primary">
      Create List
    </Button>
  </form>
);

CreateList.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CreateList;
