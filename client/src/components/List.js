import React from "react";
import { Button, Panel, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import EditableField from "./EditableField";
import CardContainer from "../containers/CardContainer";

const buildCards = (cards, token) => {
  return cards.map(card =>
    <CardContainer key={card._id} card={card} token={token} />
  );
};

const List = ({ list, token, onDeleteList, onUpdateList, onCreateCard }) => {
  let cardPanels;
  if (list.cards.length === 0) {
    cardPanels = <h4>No Cards found! Create a new card to get started.</h4>;
  } else {
    cardPanels = buildCards(list.cards, token);
  }
  return (
    <Col md={6}>
      <Panel
        bsStyle="primary"
        header={
          <EditableField fieldName="title" onSubmit={onUpdateList}>
            <h4>{list.title}</h4>
          </EditableField>
        }
        className="list-panel"
      >
        <ListGroup fill>
          <ListGroupItem>
            <EditableField fieldName="description" onSubmit={onUpdateList}>
              <p className="list-description">{list.description}</p>
            </EditableField>
          </ListGroupItem>
          <ListGroupItem>
          {cardPanels}
          <Button
            bsStyle="success"
            onClick={e => onCreateCard(e, list._id)}
            className="card-create"
          >
            &#43;
          </Button>
          </ListGroupItem>
        </ListGroup>


      </Panel>
      <a onClick={e => onDeleteList(e, list._id)} className="list-delete">
        Delete This List
      </a>
    </Col>
  );
};

export default List;
