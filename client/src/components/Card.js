import React from "react";
import { Panel, Row, Col } from "react-bootstrap";
import EditableField from "./EditableField";
import CardModalContainer from "../containers/CardModalContainer";

const Card = ({ card, currentCard, token, onUpdateCard, onDeleteCard }) => {
  let members = card.members.map(member => (
    <p key={member._id}>{member.email}</p>
  ));
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
      <Row>
        <Col md={6}>
          <CardModalContainer currentCard={currentCard} token={token} card={card}/>
          <a onClick={e => onDeleteCard(e, card._id)} className="card-delete">
            Delete This Card
          </a>
        </Col>
        <Col md={6}>
        <strong>Current Members:</strong>
        {members}
        </Col>
      </Row>
    </Panel>
  );
};

export default Card;
