import React, { Component } from "react";
import { connect } from "react-redux";
import BoardPicker from "../components/BoardPicker";
import { getAllBoardsInit } from "../actions/allBoards";
import {
  getSpecificBoard,
  createBoard,
  deleteBoard
} from "../actions/specificBoard";

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
    allBoards: state.allBoards.data,
    selectedBoard: state.specificBoard.data
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
    },
    onDeleteBoard: e => {
      if (
        window.confirm(
          `Are you sure you want to delete the following board? \n \n ${ownProps
            .currentBoard.title}`
        )
      ) {
        e.preventDefault();
        dispatch(
          deleteBoard(
            ownProps.token,
            ownProps.currentBoard._id,
            ownProps.userId
          )
        );
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  BoardPickerContainer
);
