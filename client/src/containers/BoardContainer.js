import React from "react";
import Board from "../components/Board";
import { connect } from "react-redux";
import { unselectBoard, createList, createCard } from "../redux/users/actions";

class BoardContainer extends React.Component {
  render() {
    const { user, selectedBoard, goToMenu, addList, addCard } = this.props;
    const board = user.boards.filter(b => b._id === selectedBoard);
    return (
      <Board
        board={board[0]}
        goToMenu={goToMenu}
        addList={addList}
        addCard={addCard}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    selectedBoard: state.selectedBoard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToMenu: () => {
      dispatch(unselectBoard());
    },
    addList: boardId => () => {
      dispatch(createList(boardId));
    },
    addCard: ({ boardId, listId }) => () => {
      dispatch(createCard({ boardId, listId }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
