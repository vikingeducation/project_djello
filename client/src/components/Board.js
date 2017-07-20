import React from "react";
import { Col, Row } from "react-bootstrap";
import EditableField from "./EditableField";
import ListContainer from "../containers/ListContainer";

const buildLists = (lists, token) => {
  return lists.map(list =>
    <ListContainer key={list._id} list={list} token={token} />
  );
};

const Board = ({ board, lists, token, onChangeBoardTitle, onCreateList }) => {
  let listPanels;
  if (lists.length === 0) {
    listPanels = <h3>No Lists found! Create a new list to get started.</h3>;
  } else {
    listPanels = buildLists(lists, token);
  }
  return (
    <Col md={12}>
      <Row>
        <Col md={4}>
          <EditableField fieldName={"title"} onSubmit={onChangeBoardTitle}>
            <h3>{board.title}</h3>
          </EditableField>
          <a className="add-list-link" onClick={onCreateList}>Add a List</a>
        </Col>
      </Row>
      <Row>
        {listPanels}
      </Row>
    </Col>
  );
};

export default Board;
