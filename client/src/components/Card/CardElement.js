import React from "react";

const CardElement = ({ card, onClick }) => {
  return (
    <div className="List">
      <h2>{card.name}</h2>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => onClick(card.id)}
      >
        Delete List
      </button>
    </div>
  );
};

export default CardElement;
