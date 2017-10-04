import React from "react";
import Card from "./Card";
import Editable from "../Editable";
import Paper from "material-ui/Paper";
import { List } from "material-ui/List";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import "../../styles/boardShowStyles.css";

const style = {
  // width: "300px",
  // margin: "20px",
  // padding: "10px",
  // textAlign: "center",
  // flex: "none"
  backgroundColor: "#e8e8e8"
  // backgroundColor: "#aa5a10"
};
const CardList = ({
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
    <Paper className="list" style={style}>
      {/* header */}
      <div className="listHeader">
        <Editable name="title" onSubmit={editList} text={title}>
          <h5>{title}</h5>
        </Editable>
        <Editable name="description" onSubmit={editList} text={description}>
          <h5>{description}</h5>
        </Editable>
      </div>
      {/* main */}
      <div className="listMain">
        {/* <ul>{cardComponents}</ul> */}
        <List className="cardList">{cardComponents}</List>
      </div>
      {/* footer */}
      <div className="listFooter">
        <Editable onSubmit={newCard}>
          <FlatButton label="New" />
        </Editable>
        <div>
          <FlatButton onClick={deleteList}>
            <i className="material-icons">delete</i>
          </FlatButton>
        </div>
      </div>
    </Paper>
  );
};

export default CardList;
