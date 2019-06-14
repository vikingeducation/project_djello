import React from "react";
import PropTypes from "prop-types";
// import Button from "./elements/Button";
import ModalButton from "./ModalButton";
import ModalCard from "./ModalCard";
import NewCardForm from "./NewCardForm";
import NewListForm from "./NewListForm";

const BoardCard = ({ title, description, cards }) => {
  let mappedCards = [];
  //if no title, then no entry
  if (!title) {
    mappedCards.push(
      <ModalButton key="AddCard" label="Add A List">
        <h4>New List</h4>
        <NewListForm />
      </ModalButton>
    );
  }

  //if title and cards, print out
  if (cards && title) {
    mappedCards = cards.map(card => (
      <ModalCard
        title={card.title}
        description={card.description ? card.description : ""}
        key={card.title}
      >
        hello
      </ModalCard>
    ));
    //add header
    mappedCards.splice(
      0,
      0,
      <div className="card-header text-left" key="header">
        <h4 className="card-title text-center">{title}</h4>
        <div className="card-subtitle mb-2 text-muted text-left">
          {description}
        </div>
      </div>
    );
    //add bottom button
    mappedCards.push(
      <ModalButton key="AddCard" label="Add A Card">
        <h4>New Card</h4>
        <NewCardForm />
      </ModalButton>
    );
  } else if (title && !cards) {
    //add bottom button
    mappedCards.push(
      <ModalButton key="AddCard" label="Add A Card">
        <h4>New Card</h4>
        <NewCardForm />
      </ModalButton>
    );
  }

  return <div className="card">{mappedCards.length ? mappedCards : ""}</div>;
};

BoardCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cards: PropTypes.array
};

export default BoardCard;
