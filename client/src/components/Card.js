import React from "react";
import { Panel } from "react-bootstrap";
import EditableField from "./EditableField";
import CardModalContainer from "../containers/CardModalContainer";

const Card = ({ card, token, onUpdateCard, onDeleteCard }) => {
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
      <CardModalContainer token={token} card={card}/>
      <a onClick={e => onDeleteCard(e, card._id)} className="card-delete">
        Delete This Card
      </a>
    </Panel>
  );
};

export default Card;
