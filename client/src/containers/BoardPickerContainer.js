import React, { Component } from "react";
import { connect } from "react-redux";
import BoardPicker from "../components/BoardPicker";
import { getAllBoardsInit, getAllBoards } from "../actions/allBoards";
import { getSpecificBoard, createBoard } from "../actions/specificBoard";

class BoardPickerContainer extends Component {
  componentDidMount() {
    this.props.getAllBoardsInit(this.props.token, this.props.userId);
  }

  render() {
    return <BoardPicker {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    userId: state.user.id,
    allBoards: state.allBoards.data
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllBoardsInit: (token, userId) => {
      dispatch(getAllBoardsInit(token, userId));
    },
    onChangeSelectedBoard: e => {
      const selectedBoard = e.target.value;
      dispatch(getSpecificBoard(ownProps.token, selectedBoard));
    },
    onCreateBoard: e => {
      e.preventDefault();
      dispatch(createBoard(ownProps.token, ownProps.userId));
      dispatch(getAllBoards(ownProps.token, ownProps.userId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPickerContainer);
