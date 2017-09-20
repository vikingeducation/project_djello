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
  createNewBoard,
  createNewCard,
  updateCard,
  deleteCard,
  addMember,
  deleteMember
} from "../actions/boards";
import { getUsers } from "../actions/users";
import BoardsManager from "../components/BoardsManager";
import serialize from "form-serialize";

class BoardContainer extends Component {
  componentDidMount() {
    this.props.getBoards(this.props.userId);
    this.props.getUsers();
  }

  render() {
    const {
      boards,
      users,
      currentBoard,
      changeCurrentBoard,
      deleteBoard,
      deleteList,
      updateList,
      handleSubmitList,
      handleSubmitBoard,
      handleSubmitCard,
      updateCard,
      deleteCard,
      addMember,
      deleteMember
    } = this.props;
    console.log(users);
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
          handleSubmitCard={handleSubmitCard}
          updateCard={updateCard}
          deleteCard={deleteCard}
          users={users}
          addMember={addMember}
          deleteMember={deleteMember}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user.userId,
    boards: state.boards.data.boards,
    currentBoard: state.boards.currentBoard,
    users: state.users.data
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBoards: userId => {
      dispatch(getBoards(userId));
    },
    changeCurrentBoard: boards => e => {
      const board = boards.find(board => board.id === +e.target.value);
      dispatch(changeCurrentBoard(board.id));
    },
    deleteBoard: boardId => e => {
      dispatch(deleteBoard(boardId));
    },
    deleteList: ({ boardId, listId }) => e => {
      dispatch(deleteList({ boardId, listId }));
    },
    deleteCard: ({ boardId, cardId }) => e => {
      dispatch(deleteCard({ boardId, cardId }));
    },
    updateList: ({ boardId, listId, title, description }) => {
      dispatch(updateList({ boardId, listId, title, description }));
    },
    updateCard: ({ boardId, cardId, title, description, name }) => {
      dispatch(updateCard({ boardId, cardId, title, description, name }));
    },
    handleSubmitList: boardId => e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      let description = data.description ? data.description : "";
      let title = data.title ? data.title : "No Title";
      dispatch(
        createNewList({
          title,
          boardId,
          description
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
    },
    handleSubmitCard: ({ boardId, listId }) => e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      let title = data.title ? data.title : "No Title";
      dispatch(
        createNewCard({ title: data.title, boardId, description: "", listId })
      );
    },
    getUsers: () => {
      dispatch(getUsers());
    },
    addMember: ({ boardId, cardId }) => e => {
      dispatch(addMember({ email: e.target.value, boardId, cardId }));
    },
    deleteMember: ({ boardId, cardId, email }) => e => {
      dispatch(deleteMember({ boardId, cardId, email }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
