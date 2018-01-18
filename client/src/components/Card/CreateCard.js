import React from "react";
import PropTypes from "prop-types";
import Input from "./../elements/Input";
import InputGroup from "./../elements/InputGroup";
import Button from "./../elements/Button";

const CreateCard = ({ onSubmit, list }) => (
  <form className="container" onSubmit={onSubmit}>
    <h5>
      Create Card for {list.name}{" "}
      <span className="glyphicon glyphicon-search" aria-hidden="true" />
    </h5>
    <InputGroup name="name" labelText="Card Name">
      <Input name="name" />
    </InputGroup>
    <InputGroup name="body" labelText="Card Name">
      <Input name="name" />
    </InputGroup>
    <Input name="listId" type="hidden" value={list.id} />
    <Button type="submit" color="primary">
      Create Card
    </Button>
  </form>
);

CreateCard.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CreateCard;
