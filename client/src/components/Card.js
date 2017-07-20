import React from "react";
import {Panel} from "react-bootstrap";
import EditableField from "./EditableField";

const Card = ({card, onUpdateCard}) => {
  return (
    <Panel 
      bsStyle="success"
      header={card.title}
    >
    <EditableField fieldName="description" onSubmit={onUpdateCard}>
      <p>{card.description}</p>
    </EditableField>
      
    </Panel>
  );
};

export default Card;