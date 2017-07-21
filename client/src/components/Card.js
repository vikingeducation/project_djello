import React from "react";
import { Panel } from "react-bootstrap";
import EditableField from "./EditableField";
import CardModal from "./CardModal";

const Card = ({ card, onUpdateCard, onDeleteCard }) => {
  return (
    <Panel
      header={
        <EditableField fieldName="title" onSubmit={onUpdateCard}>
          {card.title}
        </EditableField>
      }
    >
      <EditableField fieldName="description" onSubmit={onUpdateCard}>
        <p>{card.description}</p>
      </EditableField>
      <CardModal card={card}/>
      <a onClick={e => onDeleteCard(e, card._id)} className="card-delete">
        Delete This Card
      </a>
    </Panel>
  );
};

export default Card;
