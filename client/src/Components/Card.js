import React from "react";
import Paper from "material-ui/Paper";

const paperStyle = {
  margin: 5
};

const Card = props => {
  return (
    <Paper style={paperStyle}>
      <p>{props.title}</p>
    </Paper>
  );
};

export default Card;
