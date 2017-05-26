import React from "react";

const cardList = cards => {
  return cards.map(card => {
    return (
      <div
        key={card.id}
        style={{ border: "1px solid black", padding: "10px", margin: "20px" }}
      >
        {" "}{card.title}{" "}
      </div>
    );
  });
};

const Cards = ({ cards }) => {
  return (
    <div>
      {cards.length ? cardList(cards) : <p>No cards...</p>}
    </div>
  );
};

export default Cards;
