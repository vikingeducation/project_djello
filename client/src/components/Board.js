import React from "react";
import { Panel, Col, Row } from "react-bootstrap";
import EditableField from "./EditableField";

const buildLists = (lists, onDeleteList) => {
  return lists.map(list => (
    <Col key={list._id} md={4}>
      <Panel>
        <h5>{list.title}</h5>
        <p>{list.description}</p>
      </Panel>
      <a onClick={(e) => onDeleteList(e, list._id)}>Delete This List</a>
    </Col>
  ));
};

const Board = ({ board, lists, onChangeBoardTitle, onCreateList, onDeleteList }) => {
  let listPanels;
  if (lists.length === 0) {
    listPanels = null;
  } else {
    listPanels = buildLists(lists, onDeleteList);
  }
  return (
    <Col md={12}>
      <Row>
        <Col md={4}>
          <EditableField fieldName={"title"} onSubmit={onChangeBoardTitle}>
            <h3>{board.title}</h3>
          </EditableField>
          <a onClick={onCreateList}>Add a List</a>
        </Col>
      </Row>
      <Row>
        {listPanels}
      </Row>
    </Col>
  );
};

export default Board;
