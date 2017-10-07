import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { getBoard } from "../socket";
import Board from "../components/Board";

class BoardContainer extends PureComponent {
  // Set the route to match the current board
  componentWillReceiveProps(nextProps) {
    const slug = nextProps.slug;
    const routeSlug = nextProps.match.params.slug;
    if (slug && slug !== routeSlug) {
      this.props.history.push(`/boards/${slug}`);
    } else if (!slug && routeSlug) {
      this.props.history.push("/boards");
    }
  }

  // Fetch a board if specified/possible, or reset the route
  componentDidMount() {
    if (this.props.boardSet.size) {
      let slug = this.props.match.params.slug;
      slug = this.props.boardSet.has(slug) ? slug : this.props.fallback;
      this.props.getBoard(slug);
    } else {
      this.props.history.replace("/boards");
    }
  }

  info = () => ({
    boardsToShow: !!this.props.fallback,
    lists: this.props.lists,
    fetching: this.props.fetching
  });

  render = () => <Board {...this.info()} />;
}

const boardsSelector = state => state.user.boards;

const boardSetSelector = createSelector(
  boardsSelector,
  boards =>
    new Set([boards.reduce((acc, board) => acc.concat([board.slug]), [])])
);

const fallbackSelector = createSelector(
  boardsSelector,
  boards => (boards[0] ? boards[0].slug : null)
);

const mapStateToProps = state => ({
  boardSet: boardSetSelector(state),
  fallback: fallbackSelector(state),
  slug: state.board.data.slug,
  lists: state.board.data.lists || [],
  fetching: state.board.fetching
});

const mapDispatchToProps = dispatch => ({
  getBoard: slug => dispatch(getBoard(slug))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
);
