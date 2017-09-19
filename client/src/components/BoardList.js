import React from "react";
import Card from "./Card";

const styles = {
  height: 500,
  width: 200,
  border: "1px solid black",
  display: "flex",
  flexWrap: "wrap"
};

const BoardList = ({ props, handleInputChange, createCard }) =>
  <div style={styles}>
    <p>
      {props.title}
    </p>
    <div>
      {props.cards.map(card =>
        <Card description={card.description} key={card._id} />
      )}
    </div>
    <div>
      <input type="text" />
      <button onClick={createCard}>Save</button>
    </div>
  </div>;

export default BoardList;
