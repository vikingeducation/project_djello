import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "../components/Board";
import {
  getBoards,
  deleteList,
  updateList,
  createNewList,
  changeCurrentBoard,
  deleteBoard,
  createNewBoard
} from "../actions/boards";
import BoardsManager from "../components/BoardsManager";
import serialize from "form-serialize";

class BoardContainer extends Component {
  componentDidMount() {
    this.props.getBoards(this.props.userId);
  }

  render() {
    const {
      boards,
      currentBoard,
      changeCurrentBoard,
      deleteBoard,
      deleteList,
      updateList,
      handleSubmitList,
      handleSubmitBoard
    } = this.props;
    console.log(boards);
    return (
      <div>
        <BoardsManager
          boards={boards}
          currentBoard={currentBoard}
          changeCurrentBoard={changeCurrentBoard}
          deleteBoard={deleteBoard}
          handleSubmitBoard={handleSubmitBoard}
        />
        <Board
          boards={boards}
          currentBoard={currentBoard}
          deleteList={deleteList}
          updateList={updateList}
          handleSubmitList={handleSubmitList}
        />
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
    changeCurrentBoard: boards => e => {
      const board = boards.find(board => board.name === e.target.value);
      dispatch(changeCurrentBoard(board.id));
    },
    deleteBoard: boardId => e => {
      dispatch(deleteBoard(boardId));
    },
    deleteList: ({ boardId, listId }) => e => {
      dispatch(deleteList({ boardId, listId }));
    },
    updateList: ({ boardId, listId, title, description }) => {
      dispatch(updateList({ boardId, listId, title, description }));
    },
    handleSubmitList: boardId => e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      dispatch(
        createNewList({
          title: data.title,
          boardId,
          description: data.description
        })
      );
    },
    handleSubmitBoard: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      dispatch(
        createNewBoard({
          name: data.name,
          userId: localStorage.getItem("userId")
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
