import React from "react";
import { Button, Panel, Row, Col } from "react-bootstrap";
import EditableField from "./EditableField";
import CardModalContainer from "../containers/CardModalContainer";

const Card = ({ card, currentCard, token, onUpdateCard, onDeleteCard }) => {
  let members = card.members.map(member =>
    <p key={member._id}>{member.email}</p>
  );
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
          <CardModalContainer
            currentCard={currentCard}
            token={token}
            card={card}
          />
          <br />
          <Button block bsStyle="danger" onClick={e => onDeleteCard(e, card._id)} className="card-delete">
            Delete Card
          </Button>
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
