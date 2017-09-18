import React, { Component } from "react";
import { createBoard, getCards } from "../actions";
import { connect } from "react-redux";
import Board from "../components/Board";
import AddBoard from "../components/AddBoard";
import PaperWrapper from "../components/PaperWrapper";
import BoardModal from "../components/BoardModal";
import { Link } from "react-router-dom";

const style = {
  height: 600,
  width: "95%",
  margin: "2.5%",
  textAlign: "center",
  display: "flex",
  flexWrap: "wrap"
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
        <PaperWrapper>
          {this.props.boards.map(board =>
            <Link
              to={`/boards/${board._id}`}
              key={board._id}
              style={{ height: 100 }}
            >
              <Board
                board={board}
                cards={this.state.cards}
                getCards={() => this.props.getCards(board._id)}
              />
            </Link>
          )}
          <AddBoard handleModalOpen={this.handleModalOpen} />
        </PaperWrapper>
        {this.state.modalOpen
          ? <BoardModal
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

const mapStateToProps = state => {
  return {
    cards: state.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createBoard: input => {
      dispatch(createBoard(input));
    },
    getCards: boardId => {
      dispatch(getCards(boardId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardsContainer);
