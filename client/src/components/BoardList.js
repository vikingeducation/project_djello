import React from "react";

const styles = {
  height: 500,
  width: 200,
  border: "1px solid black",
  display: "flex",
  flexWrap: "wrap"
};

const BoardList = ({ title }) =>
  <div style={styles}>
    {title}
  </div>;

export default BoardList;
