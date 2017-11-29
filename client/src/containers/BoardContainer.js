import React, { Component } from "react";
//Redux
import { connect } from "react-redux";

import Button from "../components/elements/Button";
import { setCurrentBoard, getBoards } from "../actions";
import NewBoardForm from "../components/NewBoardForm";
import ListContainer from "./ListContainer";

class BoardContainer extends Component {
  componentWillMount() {
    //Call boards from db here
    this.props.getBoards();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.boards.length && !this.props.currentBoard) {
      nextProps.setCurrentBoardName({
        target: { value: nextProps.boards[0].title }
      });
    }
  }

  render() {
    let boardsDropdown = this.props.boards.map(board => {
      return (
        <option value={board.title} key={board.title}>
          {board.title}
        </option>
      );
    });

    return (
      <div className="container container-fluid">
        <div className="row">
          <div className="col">
            <p>Board Title</p>
          </div>
          <div className="col">
            <Button
              color="danger"
              size="sm"
              onClick={() => console.log("Delete", this.props.currentBoard)}
            >
              Delete Board
            </Button>
          </div>
          <div className="col">
            <NewBoardForm size="sm" />
          </div>
          <div className="col">
            <label>Select Board</label>
            <select onChange={this.props.setCurrentBoardName}>
              {boardsDropdown}
            </select>
          </div>
        </div>

        {this.props.currentBoard ? <ListContainer /> : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentBoard: state.currentBoard,
    boards: state.boards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentBoardName: data => {
      console.log("SCN", data);
      dispatch(setCurrentBoard(data.target.value));
    },
    getBoards: () => {
      dispatch(getBoards());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
