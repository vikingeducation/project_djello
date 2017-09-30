import React from "react";

import List from "./List";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

const style = {
  width: "300px",
  margin: "20px"
};
const flexBoard = {
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  width: "auto",
  textAlign: "center",
  position: "absolute",
  justifyContent: "space-evenly",
  boxSizing: "border-box"
};

const NewList = ({ cards, newList }) => {
  return (
    <Paper style={style}>
      <FlatButton onClick={newList} label="New" />
    </Paper>
  );
};

const Board = ({
  lists,
  newCard,
  newList,
  deleteList,
  deleteCard,
  editList,
  editCard
}) => {
  if (!lists) return null;
  return (
    <div style={flexBoard}>
      {lists.map(list => (
        <List
          {...list}
          key={list._id}
          id={list._id}
          newCard={e => newCard(e, list._id)}
          deleteList={e => deleteList(e, list._id)}
          deleteCard={deleteCard}
          title={list.title}
          description={list.description}
          editList={e => editList(e, list._id)}
          editCard={editCard}
        />
      ))}
      <NewList id="newBtn" newList={newList} />
    </div>
  );
};
export default Board;
