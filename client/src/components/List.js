import React from "react";
import {Panel, Col } from "react-bootstrap";
import EditableField from "./EditableField";
import CardContainer from "../containers/CardContainer";

const buildCards = (cards, token) => {
  return cards.map(card => (
    <CardContainer key={card._id} card={card} token={token} />
  ));
}

const List = ({list, token, onDeleteList, onUpdateList}) => {
  let cardPanels;
  if (list.cards.length === 0) {
    cardPanels = null;
  } else {
    cardPanels = buildCards(list.cards, token);
  }
  return (
    <Col md={6}>
      <Panel 
        header={
          <EditableField fieldName="title" onSubmit={onUpdateList}>
            <h4>{list.title}</h4>
          </EditableField>
        } 
        className="list-panel"
      > 
        <EditableField fieldName="description" onSubmit={onUpdateList}>
          <p>{list.description}</p>
        </EditableField>

        {cardPanels}

      </Panel>
      <a onClick={(e) => onDeleteList(e, list._id)} className="list-delete">Delete This List</a>
    </Col>
  )
};

export default List;