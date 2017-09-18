import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import socket from "../socket";

import Board from "../components/Board";
import { boardActions } from "../actions";

class BoardContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: {},
      fetching: false,
      error: ""
    };
  }

  componentDidMount() {
    socket.on("getBoardSuccess", board => {
      if (board.slug !== this.state.current.slug) {
        this.setState({ current: board, fetching: false });
      }
    });
    socket.on("getBoardError", error => {
      this.setState({ error, fetching: false });
    });
  }

  componentDidUpdate() {
    const slug = this.props.match.params.slug;
    if (!slug && this.props.boards[0]) {
      this.props.history.push(`/boards/${this.props.boards[0].slug}`);
    } else if (slug && slug !== this.state.current.slug) {
      socket.emit("getBoard", slug);
      this.setState({ fetching: true });
    }
  }

  onChangeBoard = (e, { value }) => this.props.history.push(`/boards/${value}`);

  actions = {
    onChangeBoard: this.onChangeBoard
  };

  info = () => ({
    ...this.state,
    boards: this.props.boardOptions
  });

  render = () => <Board info={this.info()} actions={this.actions} />;
}

const boardsSelector = state => state.boards;

const boardOptionsSelector = createSelector(boardsSelector, boards =>
  boards.map(board => ({
    key: board.slug,
    value: board.slug,
    text: board.title
  }))
);

const mapStateToProps = state => ({
  boards: state.boards.list,
  boardOptions: boardOptionsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrent: slug => dispatch(boardActions.setCurrent(slug))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
);
