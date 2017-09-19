import React from "react";
import PaperWrapper from "./PaperWrapper";
import { Link } from "react-router-dom";
import { green900 } from "material-ui/styles/colors";

const style = {
  height: 100,
  width: 300,
  margin: "2.5%",
  textAlign: "center",
  display: "flex"
};

export default ({ board, getLists }) =>
  <div style={style}>
    <PaperWrapper zDepth={2} onClick={getLists}>
      <h2>
        <Link
          to={`/boards/${board._id}`}
          key={board._id}
          style={{ textDecoration: "none", color: green900 }}
        >
          {board.title}
        </Link>
      </h2>
    </PaperWrapper>
  </div>;
