import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { getBoard, delBoard } from "../socket";
import Board from "../components/Board";

class BoardContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      getting: ""
    };
  }

  componentDidUpdate() {
    const slug = this.props.match.params.slug;
    if (!slug || (slug && !this.props.boardHash[slug])) {
      const dest = this.props.boards.length
        ? `/boards/${this.props.boards[0].slug}`
        : "/boards";
      if (dest !== this.props.history.location.pathname) {
        this.props.history.push(dest);
      }
    } else if (
      slug &&
      ![this.props.current.slug, this.state.getting].includes(slug)
    ) {
      this.setState({ getting: slug }, () => this.props.getBoard(slug));
    }
  }

  onChangeBoard = (e, { value }) => this.props.history.push(`/boards/${value}`);
  onDelBoard = slug => () => {
    this.props.delBoard(slug);
    this.props.history.push("/boards");
  };

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

const boardsSelector = state => state.boards;

const boardOptionsSelector = createSelector(boardsSelector, boards =>
  boards.map(board => ({
    key: board.slug,
    value: board.slug,
    text: board.title
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
  boards: state.boards,
  boardOptions: boardOptionsSelector(state),
  current: state.current.board,
  fetching: state.current.fetching
});

const mapDispatchToProps = dispatch => ({
  getBoard: slug => dispatch(getBoard(slug)),
  delBoard: slug => dispatch(delBoard(slug))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
);
