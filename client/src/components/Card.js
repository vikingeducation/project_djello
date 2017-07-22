import React from "react";
import { Button, Panel, Row, Col } from "react-bootstrap";
import EditableField from "./EditableField";
import CardModalContainer from "../containers/CardModalContainer";
import { SortableHandle } from 'react-sortable-hoc';
import FontAwesome from "react-fontawesome";

const DragHandle = SortableHandle(() => (
  <div className="drag-handle">
    <FontAwesome
      name='bars'
      size='2x'
    />
  </div>
));

const Card = ({ card, currentCard, token, onUpdateCard, onDeleteCard }) => {
  let members = card.members.map(member =>
    <p key={member._id}>{member.email}</p>
  );
  return (
    <Panel
      header={
        <div>
          <EditableField fieldName="title" onSubmit={onUpdateCard}>
            {card.title}
          </EditableField>
          <DragHandle />
        </div>
      }
      className="panel-header"
    >
      <EditableField fieldName="description" onSubmit={onUpdateCard}>
        <p>{card.description}</p>
      </EditableField>
      <Row>
        <Col md={6}>
          <strong>Current Members:</strong>
          {members}
        </Col>
        <Col md={6}>
          <Button
            block
            bsStyle="danger"
            onClick={e => onDeleteCard(e, card._id)}
            className="card-delete"
          >
            Delete Card
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CardModalContainer
            currentCard={currentCard}
            token={token}
            card={card}
          />
        </Col>
        </Row>
    </Panel>
  );
};

export default Card;
