import React from "react";

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
    <input type="text" onChange={handleInputChange} />
    <button onClick={createCard}>Save</button>
  </div>;

export default BoardList;
