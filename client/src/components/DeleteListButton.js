import React from "react";
import { Button } from "reactstrap";

const DeleteListButton = ({ onClick }) => {
  return <Button color="link" onClick={onClick}>Delete List</Button>;
};

export default DeleteListButton;
