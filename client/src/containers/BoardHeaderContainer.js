import React, { PureComponent } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";

import { getBoard, delBoard, addBoard } from "../socket";
import BoardHeader from "../components/BoardHeader";

class BoardHeaderContainer extends PureComponent {
  onDelBoard = () => this.props.delBoard(this.props.slug);
  onChangeBoard = (e, { value }) => {
    if (this.props.slug !== value) this.props.getBoard(value);
  };

  info = () => ({
    title: this.props.title,
    boards: this.props.boards
  });

  actions = {
    onChangeBoard: this.onChangeBoard,
    onDelBoard: this.onDelBoard,
    onAddBoard: this.props.addBoard
  };

  render = () => <BoardHeader info={this.info()} actions={this.actions} />;
}

const boardsSelector = state => state.user.boards;

const boardOptionsSelector = createSelector(boardsSelector, boards =>
  boards.map(board => ({
    key: board.slug,
    value: board.slug,
    text: board.title
  }))
);

const mapStateToProps = state => ({
  boards: boardOptionsSelector(state),
  title: state.board.data.title,
  slug: state.board.data.slug
});

const mapDispatchToProps = dispatch => ({
  getBoard: slug => dispatch(getBoard(slug)),
  delBoard: slug => dispatch(delBoard(slug)),
  addBoard: title => dispatch(addBoard(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  BoardHeaderContainer
);
