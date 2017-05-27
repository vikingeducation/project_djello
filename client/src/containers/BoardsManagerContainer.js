import React from "react";
import { connect } from "react-redux";
import { changeCurrentBoard, deleteBoard } from "../actions/boards";
import BoardsManager from "../components/BoardsManager";

class BoardsManagerContainer extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    return (
      <BoardsManager
        {...this.props}
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards.data.boards,
    currentBoard: state.boards.currentBoard
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeCurrentBoard: boards => e => {
      const board = boards.find(board => board.name === e.target.value);
      dispatch(changeCurrentBoard(board.id));
    },
    deleteBoard: boardId => e => {
      dispatch(deleteBoard(boardId));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  BoardsManagerContainer
);
