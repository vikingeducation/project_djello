import React, { Component } from "react";
import { createBoard } from "../actions";
import { connect } from "react-redux";
import Board from "../components/Board";
import AddBoard from "../components/AddBoard";
import Dialog from "material-ui/Dialog";
import PaperWrapper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import Form from "../components/Form";
import { Link, withRouter } from "react-router-dom";

const style = {
  height: 600,
  width: "95%",
  margin: "2.5%",
  textAlign: "center",
  display: "flex",
  flexWrap: "wrap"
};

class BoardContainer extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    };
  }

  handleModalOpen = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleModalOpen}
      />
    ];

    return (
      <div>
        <PaperWrapper>
          {this.props.boards.map(board =>
            <Link to={`/boards/${board._id}`}>
              <Board board={board} key={board._id} />
            </Link>
          )}
          <AddBoard handleModalOpen={this.handleModalOpen} />
        </PaperWrapper>
        {this.state.modalOpen
          ? <div>
              <Dialog
                title="Add a new board"
                modal={false}
                actions={actions}
                open={this.state.modalOpen}
                onRequestClose={this.handleModalOpen}
              >
                Please provide a name for your new board
                <Form
                  createBoard={this.props.createBoard}
                  user={this.props.user}
                />
              </Dialog>
            </div>
          : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createBoard: input => {
      dispatch(createBoard(input));
    }
  };
};

export default connect(null, mapDispatchToProps)(BoardContainer);
