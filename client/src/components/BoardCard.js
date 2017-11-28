import React from "react";
import PropTypes from "prop-types";
import Button from "./elements/Button";
import ModalButton from "./ModalButton";
import NewCardForm from "./NewCardForm";

const BoardCard = ({ title, description, cards }) => {
  let mappedCards = [];
  //if no title, then no entry
  if (!title) {
    mappedCards.push(
      <Button color="primary" key="NewList">
        Add A List
      </Button>
    );
  }

  //if title and cards, print out
  if (cards && title) {
    mappedCards = cards.map(card => (
      <div className="card subcard" key={card.title}>
        <p>{card.title}</p>
      </div>
    ));
    //add header
    mappedCards.splice(
      0,
      0,
      <div className="card-header" key="header">
        <h4 className="card-title text-center">{title}</h4>
        <div className="card-subtitle mb-2 text-muted">{description}</div>
      </div>
    );
    //add bottom button
    mappedCards.push(
      <ModalButton key="AddCard" label="Add A Card">
        <NewCardForm />
      </ModalButton>
    );
  } else if (title && !cards) {
    //add bottom button
    mappedCards.push(
      <ModalButton key="AddCard" label="Add A Card">
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
