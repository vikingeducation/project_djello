import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { getBoard, delBoard, addBoard } from "../socket";
import Board from "../components/Board";

class BoardContainer extends PureComponent {
  boardPicker = props => {
    if (!props.fetching) {
      const slug = props.match.params.slug;
      if (!slug || (slug && !props.boardHash[slug])) {
        const dest = props.boards.length
          ? `/boards/${props.boards[0].slug}`
          : "/boards";
        if (dest !== props.history.location.pathname) {
          props.history.push(dest);
        }
      } else if (slug && slug !== props.current.slug) {
        props.getBoard(slug);
      }
    }
  };
  componentWillReceiveProps(nextProps) {
    this.boardPicker(nextProps);
  }
  componentDidMount() {
    this.boardPicker(this.props);
  }

  onChangeBoard = (e, { value }) => this.props.history.push(`/boards/${value}`);
  onDelBoard = slug => () => this.props.delBoard(slug);

  actions = {
    onChangeBoard: this.onChangeBoard,
    onDelBoard: this.onDelBoard,
    onAddBoard: this.props.addBoard
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
  delBoard: slug => dispatch(delBoard(slug)),
  addBoard: () => dispatch(addBoard())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
);
