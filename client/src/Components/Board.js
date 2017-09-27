import React from "react";

import List from "./List";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

const style = {
  width: 300,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};

const NewList = ({ cards, newList }) => {
  return (
    <Paper style={style}>
      <FlatButton onClick={newList} label="New" />
    </Paper>
  );
};

const Board = ({ lists, newCard, newList, deleteList, deleteCard, edit }) => {
  if (!lists) return null;
  return (
    <div>
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
          edit={e => edit(e, list._id)}
        />
      ))}
      <NewList id="newBtn" newList={newList} />
    </div>
  );
};
export default Board;
