import React, { Component } from "react";
import { createBoard, getLists } from "../actions";
import { connect } from "react-redux";
import Board from "../components/Board";
import AddBoard from "../components/AddBoard";
import PaperWrapper from "../components/PaperWrapper";
import BoardsModal from "../components/BoardsModal";

const style = {
  height: 600,
  width: "95%",
  margin: "2.5%",
  textAlign: "center",
  display: "flex",
  flexWrap: "wrap",
  background: "lightgray"
};

class BoardsContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    };
  }

  handleModalOpen = () => this.setState({ modalOpen: !this.state.modalOpen });

  // Takes the boards props and maps each one into its own board on the dashboard
  // Also handles the creation of a new board using the BoardModal
  render() {
    return (
      <div style={style}>
        <h1>Your Boards</h1>
        <PaperWrapper>
          <AddBoard handleModalOpen={this.handleModalOpen} />
          {this.props.boards.length &&
            this.props.boards.map(board =>
              <Board
                board={board}
                key={board._id}
                lists={this.state.lists}
                getLists={() => this.props.getLists(board._id)}
              />
            )}
        </PaperWrapper>
        {this.state.modalOpen
          ? <BoardsModal
              open={this.state.modalOpen}
              onRequestClose={this.handleModalOpen}
              createBoard={this.props.createBoard}
              user={this.props.user}
            />
          : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createBoard: input => {
      dispatch(createBoard(input));
    },
    getLists: boardId => {
      dispatch(getLists(boardId));
    }
  };
};

export default connect(null, mapDispatchToProps)(BoardsContainer);
