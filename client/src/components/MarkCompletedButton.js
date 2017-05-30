import React from "react";
import { Button } from "reactstrap";

const MarkCompletedButton = ({ onClick }) => {
  return (
    <Button color="link" onClick={onClick}>
      Mark Completed
    </Button>
  );
};

export default MarkCompletedButton;
