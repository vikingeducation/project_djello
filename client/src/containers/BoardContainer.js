import React, { Component } from "react";
import { connect } from "react-redux";

import { ListsActions } from "../actions";
import Board from "../components/Board";

class BoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: []
    };
  }

  componentWillMount() {
    const { listsGet } = this.props;
    listsGet();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.board) return;
    this.setState({
      lists: nextProps.ListsReducers.listsData.filter(
        list => list.board === nextProps.board._id
      )
    });
  }

  render() {
    return <Board lists={this.state.lists} />;
  }
}

const mapStateToProps = state => {
  return {
    ListsReducers: state.ListsReducers
  };
};

const mapDispatchToProps = dispatch => ({
  listsGet: () => {
    dispatch(ListsActions.listsGet());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
