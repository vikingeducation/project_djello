import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FloatingActionButton } from "material-ui";

import { createBoard, getAllBoards } from "../actions/board";

export const makeBoardShow = id => `/boards/${id}`;

class BoardsIndexContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  onCreateBoard = (name = "newBoard YOOOO") => {
    //TODO: find the magic to do this
    //change url
    console.log("createBoard called");
    this.props.createBoard(name);
  };

  render() {
    console.log("board props = ", this.props);
    const boards = this.props.boards.map(board => {
      const url = makeBoardShow(board._id);
      return (
        <li>
          <Link to={url}>{board.title}</Link>
        </li>
      );
    });
    const newBoard = (
      <FloatingActionButton onClick={this.onCreateBoard}>
        <i className="material-icons">add</i>
      </FloatingActionButton>
    );

    return (
      <div>
        <h1>Nav Bar for a Board</h1>
        <p>Boards Index Page </p>
        <ul>
          {boards}
          {newBoard}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // isFetching: state.user.isFetching,
    // error: state.user.error,
    ...state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createBoard: name => {
      dispatch(createBoard(name));
    },
    getAllBoards: user => {
      dispatch(getAllBoards(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  BoardsIndexContainer
);
