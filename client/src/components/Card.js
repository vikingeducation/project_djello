import React from "react";
import {Panel} from "react-bootstrap";
const Card = ({card}) => {
  return (
    <Panel header={card.title}>
      {card.description}
    </Panel>
  );
};

export default Card;