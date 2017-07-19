import React, { Component } from "react";
import { connect } from "react-redux";
import BoardPicker from "../components/BoardPicker";
import { getAllBoards } from "../actions/boards";

class BoardPickerContainer extends Component {
  componentDidMount() {
    this.props.getAllBoards(this.props.token, this.props.userId);
  }

  render() {
    return <BoardPicker {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    token: state.user.token,
    userId: state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllBoards: (token, userId) => {
      dispatch(getAllBoards(token, userId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPickerContainer);
