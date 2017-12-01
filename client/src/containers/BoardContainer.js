import React, { Component } from "react";
//Redux
import { connect } from "react-redux";

import Button from "../components/elements/Button";
import { setCurrentBoard, getBoards, setInputfieldShow } from "../actions";
import NewBoardForm from "../components/NewBoardForm";
import ListContainer from "./ListContainer";
import { deleteBoard, changeBoard } from "../actions";
import EditableField from "../components/EditableField";

class BoardContainer extends Component {
  componentWillMount() {
    //Call boards from db here
    this.props.getBoards();
  }

  componentWillReceiveProps(nextProps) {
    //Set initail board title
    if (nextProps.boards.length && !this.props.currentBoard) {
      nextProps.setCurrentBoardName({
        target: { value: nextProps.boards[0].title }
      });
    }
    //If delete last board then set Title empty
    if (!nextProps.boards.length && this.props.currentBoard) {
      nextProps.setCurrentBoardName({ target: { value: "" } });
      nextProps.getBoards();
    }
    //If delete one board of many
    if (
      nextProps.boards.length !== this.props.boards.length &&
      nextProps.boards.length > 0
    ) {
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
      <div
        className="container container-fluid"
        onClick={() => {
          if (this.props.inputField) {
            this.props.setInputfieldShow(false);
          }
        }}
      >
        <div className="row">
          <div className="col">
            <EditableField
              currentValue={this.props.currentBoard}
              changeValue={this.props.changeBoard}
              setCurrentValue={this.props.setCurrentBoardName}
            />
          </div>
          <div className="col">
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                this.props.deleteBoard(this.props.currentBoard);
                console.log("Delete", this.props.currentBoard);
              }}
            >
              Delete Board
            </Button>
          </div>
          <div className="col">
            <NewBoardForm size="sm" />
          </div>
          <div className="col">
            <label>Select Board</label>
            <select
              onChange={this.props.setCurrentBoardName}
              value={this.props.currentBoard}
            >
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
    boards: state.boards,
    inputField: state.inputField
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentBoardName: data => {
      dispatch(setCurrentBoard(data.target.value));
    },
    getBoards: () => {
      dispatch(getBoards());
    },
    deleteBoard: data => {
      dispatch(deleteBoard(data));
    },
    changeBoard: (oldName, newName) => {
      dispatch(changeBoard(oldName, newName));
    },
    setInputfieldShow: booleanValue => {
      dispatch(setInputfieldShow(booleanValue));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
