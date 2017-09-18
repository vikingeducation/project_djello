import React from "react";
import Button from "../components/elements/Button";

const Board = ({ board, goToMenu, addList, addCard }) => {
  return (
    <div>
      <Button onClick={goToMenu} text="View All Boards" />
      <Button onClick={addList(board._id)} text="Add a list" />
      <h1>{board.title}</h1>
      <h3>{board.description}</h3>
      {board.lists.map(l => {
        return (
          <div style={{ border: "1px solid orange" }} key={l._id}>
            <h4>{l.title}</h4>
            <h5>{l.description}</h5>
            <Button
              onClick={addCard({ boardId: board._id, listId: l._id })}
              text="Add Card"
            />
            {l.cards.map(c => {
              return (
                <div style={{ border: "1px solid black" }}>
                  <h6>{c.text}</h6>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
