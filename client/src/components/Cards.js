import React from "react";
import CardModal from "./CardModal";

const cardList = ({
  cards,
  listTitle,
  updateCard,
  boardId,
  deleteCard,
  users,
  addMember,
  deleteMember
}) => {
  return cards.map(card => {
    return (
      <div
        key={card.id}
        style={{
          padding: "10px",
          margin: "20px",
          backgroundColor: "white",
          border: "2px solid #317EAC",
          borderRadius: "5px"
        }}
      >
        <CardModal
          card={card}
          listTitle={listTitle}
          updateCard={updateCard}
          boardId={boardId}
          deleteCard={deleteCard}
          users={users}
          addMember={addMember}
          deleteMember={deleteMember}
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
  users,
  addMember,
  deleteMember
}) => {
  return (
    <div>
      {cards.length
        ? cardList({
            cards,
            listTitle,
            updateCard,
            boardId,
            deleteCard,
            users,
            addMember,
            deleteMember
          })
        : <p>No cards...</p>}
    </div>
  );
};

export default Cards;
