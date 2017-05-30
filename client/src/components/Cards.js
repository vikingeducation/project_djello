import React from "react";
import CardModal from "./CardModal";

const cardList = ({
  cards,
  listTitle,
  updateCard,
  boardId,
  deleteCard,
  users
}) => {
  return cards.map(card => {
    return (
      <div
        key={card.id}
        style={{ border: "1px solid black", padding: "10px", margin: "20px" }}
      >
        <CardModal
          card={card}
          listTitle={listTitle}
          updateCard={updateCard}
          boardId={boardId}
          deleteCard={deleteCard}
          users={users}
        />
      </div>
    );
  });
};

const Cards = ({
  cards,
  listTitle,
  updateCard,
  boardId,
  deleteCard,
  users
}) => {
  return (
    <div>
      {cards.length
        ? cardList({ cards, listTitle, updateCard, boardId, deleteCard, users })
        : <p>No cards...</p>}
    </div>
  );
};

export default Cards;
