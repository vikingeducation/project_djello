import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { getBoard } from "../socket";
import Board from "../components/Board";

class BoardContainer extends PureComponent {
  componentDidUpdate() {
    const slug = this.props.match.params.slug;
    if (!slug && this.props.boards && this.props.boards[0]) {
      this.props.history.push(`/boards/${this.props.boards[0].slug}`);
    } else if (slug && slug !== this.props.current.slug) {
      this.props.getBoard(slug);
    }
  }

  onChangeBoard = (e, { value }) => this.props.history.push(`/boards/${value}`);

  actions = {
    onChangeBoard: this.onChangeBoard
  };

  info = () => ({
    boards: this.props.boardOptions,
    current: this.props.current,
    fetching: this.props.fetching
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
  boards: state.boards,
  boardOptions: boardOptionsSelector(state),
  current: state.current.board,
  fetching: state.current.fetching
});

const mapDispatchToProps = dispatch => ({
  getBoard: slug => dispatch(getBoard(slug))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
);
