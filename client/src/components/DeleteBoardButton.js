import React from "react";
import { Button } from "reactstrap";

const DeleteBoardButton = ({ onClick }) => {
  return <Button color="danger" onClick={onClick}>Delete Board</Button>;
};

export default DeleteBoardButton;
