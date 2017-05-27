import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "../components/Board";
import { getBoards, deleteList, updateList } from "../actions/boards";
import BoardsManagerContainer from "./BoardsManagerContainer";
import serialize from "form-serialize";

class BoardContainer extends Component {
  componentDidMount() {
    this.props.getBoards(this.props.userId);
  }

  render() {
    return (
      <div>
        <BoardsManagerContainer />
        <Board {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user.userId,
    boards: state.boards.data.boards,
    currentBoard: state.boards.currentBoard
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBoards: userId => {
      dispatch(getBoards(userId));
    },
    deleteList: ({ boardId, listId }) => e => {
      dispatch(deleteList({ boardId, listId }));
    },
    updateList: ({ boardId, listId }) => e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      dispatch(updateList({ title: data.title, boardId, listId }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
