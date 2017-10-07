import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { getBoard, delBoard } from "../socket";
import Board from "../components/Board";

class BoardContainer extends PureComponent {
  // Set the route to match the current board
  componentWillReceiveProps(nextProps) {
    const slug = nextProps.current.slug;
    if (slug && slug !== this.props.current.slug) {
      this.props.history.push(`/boards/${nextProps.current.slug}`);
    } else if (!slug && this.props.match.params.slug) {
      this.props.history.push("/boards");
    }
  }

  // Fetch a board if specified/possible, or reset the route
  componentDidMount() {
    if (this.props.boards.length) {
      let slug = this.props.match.params.slug;
      slug = this.props.boardHash[slug] ? slug : this.props.boards[0].slug;
      this.props.getBoard(slug);
    } else {
      this.props.history.replace("/boards");
    }
  }

  onChangeBoard = (e, { value }) => this.props.getBoard(value);
  onDelBoard = slug => () => this.props.delBoard(slug);

  actions = {
    onChangeBoard: this.onChangeBoard,
    onDelBoard: this.onDelBoard
  };

  info = () => ({
    numBoards: this.props.boards.length,
    boards: this.props.boardOptions,
    current: this.props.current,
    fetching: this.props.fetching
  });

  render = () => <Board info={this.info()} actions={this.actions} />;
}

const boardsSelector = state => state.user.boards;

const untitled = "Click to edit title";
const boardOptionsSelector = createSelector(boardsSelector, boards =>
  boards.map(board => ({
    key: board.slug,
    value: board.slug,
    text: board.title === untitled ? "untitled" : board.title
  }))
);

const boardHashSelector = createSelector(boardsSelector, boards =>
  boards.reduce((hash, board) => {
    hash[board.slug] = board.title;
    return hash;
  }, {})
);

const mapStateToProps = state => ({
  boardHash: boardHashSelector(state),
  boards: state.user.boards,
  boardOptions: boardOptionsSelector(state),
  current: state.board.data,
  fetching: state.board.fetching
});

const mapDispatchToProps = dispatch => ({
  getBoard: slug => dispatch(getBoard(slug)),
  delBoard: slug => dispatch(delBoard(slug))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
);
