import React from "react";
import { Link } from "react-router-dom";

export const makeBoardShow = id => `/boards/${id}`;

class BoardsIndexContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("board props = ", this.props);
    const boards = this.props.user.boards.map(board => {
      const url = makeBoardShow(board._id);
      return (
        <li>
          <Link to={url}>{board.title}</Link>
        </li>
      );
    });
    return (
      <div>
        <h1>Nav Bar for a Board</h1>
        <p>Boards Index Page </p>
        <ul>{boards}</ul>
      </div>
    );
  }
}
export default BoardsIndexContainer;
