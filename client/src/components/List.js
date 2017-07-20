import React from "react";
import {Panel, Col } from "react-bootstrap";
import EditableField from "./EditableField";

const List = ({list, onDeleteList, onUpdateList}) => {
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
      </Panel>
      <a onClick={(e) => onDeleteList(e, list._id)} className="list-delete">Delete This List</a>
    </Col>
  )
};

export default List;