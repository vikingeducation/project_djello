import React from "react";

const BoardsMenuItem = ({ b, onClick }) => {
  return (
    <div onClick={onClick} style={{ border: "1px solid orange" }}>
      <h3>{b.title}</h3>
      <h5>{b.description}</h5>
    </div>
  );
};

export default BoardsMenuItem;
