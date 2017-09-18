import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { Header } from "semantic-ui-react";

import Board from "../components/Board";
import { boardActions } from "../actions";

const BASES = ["/boards", "/boards/"];

class BoardContainer extends PureComponent {
  nextSlug = "";
  componentWillReceiveProps(nextProps) {
    const prop = nextProps.boards;
    const next = nextProps.match.params.slug || (prop[0] && prop[0].slug) || "";
    const current = this.props.current.slug;
    if (next !== this.nextSlug && next !== current) {
      this.nextSlug = next;
      this.props.setCurrent(next);
      if (BASES.includes(this.props.history.location.pathname)) {
        nextProps.history.push(`/boards/${next}`);
      }
    }
  }

  onChangeBoard = (e, { value }) => {
    this.props.history.push(`/boards/${value}`);
  };

  actions = {
    onChangeBoard: this.onChangeBoard
  };

  render() {
    if (this.props.current.title) {
      const info = {
        boards: this.props.boardOptions,
        selected: this.props.current
      };
      return <Board info={info} actions={this.actions} />;
    } else {
      return <Header as="h1">You don't have any boards...</Header>;
    }
  }
}

const boardsSelector = state => state.boards.list;

const boardOptionsSelector = createSelector(boardsSelector, boards =>
  boards.map(board => ({
    key: board.slug,
    value: board.slug,
    text: board.title
  }))
);

const mapStateToProps = state => ({
  current: state.boards.current,
  boards: state.boards.list,
  boardOptions: boardOptionsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrent: slug => dispatch(boardActions.setCurrent(slug))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
);
