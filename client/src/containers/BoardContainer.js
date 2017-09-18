import React, { Component } from "react";
import { connect } from "react-redux";

import { ListsActions } from "../actions";
import Board from "../components/Board";

class BoardContainer extends Component {
  constructor() {
    super();

    this.state = {
      lists: []
    };
  }

  componentWillMount() {
    const { listsGet } = this.props;
    listsGet();
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps: ", nextProps);
    this.setState({
      lists: nextProps.ListsReducers.listsData
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
