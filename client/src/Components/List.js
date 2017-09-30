import React from "react";
import Card from "./Card";
import Editable from "../Components/Editable";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

const style = {
  width: "300px",
  margin: "20px",
  padding: "10px",
  textAlign: "center",
  flex: "none"
};
const List = ({
  id,
  cards,
  newCard,
  deleteList,
  deleteCard,
  editList,
  editCard,
  title,
  description
}) => {
  const cardComponents = cards.map(card => (
    <Card
      key={card._id}
      {...card}
      list={id}
      edit={e => editCard(e, card._id, id)}
    />
  ));
  return (
    <Paper style={style}>
      <Editable name="title" onSubmit={editList} text={title}>
        <h5>{title}</h5>
      </Editable>
      <Editable name="description" onSubmit={editList} text={description}>
        <h5>{description}</h5>
      </Editable>
      <ul>{cardComponents}</ul>
      <Editable onSubmit={newCard}>
        <FlatButton label="New" />
      </Editable>
      <div>
        <FlatButton onClick={deleteList}>
          <i className="material-icons">delete</i>
        </FlatButton>
      </div>
    </Paper>
  );
};

export default List;
