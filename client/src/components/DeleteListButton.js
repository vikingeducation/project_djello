import React from "react";
import { Button } from "reactstrap";

const DeleteListButton = ({ onClick }) => {
  return (
    <Button color="link" onClick={onClick} style={{ display: "block" }}>
      Delete List
    </Button>
  );
};

export default DeleteListButton;
