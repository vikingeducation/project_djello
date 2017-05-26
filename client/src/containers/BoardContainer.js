import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "../components/Board";
import { getBoards } from "../actions/boards";
import DropDownContainer from "./DropDownContainer";

class BoardContainer extends Component {
  componentDidMount() {
    this.props.getBoards(this.props.userId);
  }

  render() {
    return (
      <div>
        <DropDownContainer />
        <Board
          boards={this.props.boards}
          currentBoard={this.props.currentBoard}
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
