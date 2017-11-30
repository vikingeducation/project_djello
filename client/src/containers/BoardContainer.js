import React, { Component } from "react";
//Redux
import { connect } from "react-redux";

import Button from "../components/elements/Button";
import { setCurrentBoard, getBoards } from "../actions";
import NewBoardForm from "../components/NewBoardForm";
import ListContainer from "./ListContainer";
import { deleteBoard, changeBoardName } from "../actions";

class BoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { show: false, boardTitle: "" };
    this.onClick = this.onClick.bind(this);
    this.onEnteredText = this.onEnteredText.bind(this);
    this.clickToHide = this.clickToHide.bind(this);
    this.preventing = this.preventing.bind(this);
    this.saveText = this.saveText.bind(this);
  }

  onClick() {
    console.log("SHOW");
    this.setState({
      show: !this.state.show,
      boardTitle: this.props.currentBoard
    });
  }
  clickToHide(e) {
    console.log("hide????");
    if (this.state.show) {
      this.setState({ show: false });
    }
  }
  onEnteredText(event) {
    this.setState({ boardTitle: event.target.value });
  }
  saveText(event) {
    this.props.changeBoardName(this.props.currentBoard, this.state.boardTitle);
    this.props.setCurrentBoardName({
      target: { value: this.state.boardTitle }
    });
    this.setState({ show: false });
  }
  preventing(event) {
    event.stopPropagation();
  }
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
    let title = <p onClick={this.onClick}>{this.props.currentBoard}</p>;

    if (this.state.show) {
      title = (
        <div onClick={this.preventing}>
          <input onChange={this.onEnteredText} value={this.state.boardTitle} />
          <button onClick={this.saveText}>Save</button>
          <button onClick={this.clickToHide}>Cancel</button>
        </div>
      );
    }

    return (
      <div className="container container-fluid" onClick={this.clickToHide}>
        <div className="row">
          <div className="col">
            {/* <p>{this.props.currentBoard}</p> */}
            {title}
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
    boards: state.boards
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
    changeBoardName: (oldName, newName) => {
      dispatch(changeBoardName(oldName, newName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
