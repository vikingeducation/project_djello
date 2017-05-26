/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";

import { connect } from "react-redux";
import CreateBoardModal from "../components/CreateBoardModal";
import { createNewBoard } from "../actions/boards";
import serialize from "form-serialize";

class CreateBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <CreateBoardModal
        {...this.props}
        toggle={this.toggle}
        modal={this.state.modal}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    currentBoard: state.boards.currentBoard,
    boards: state.boards.data.boards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      dispatch(
        createNewBoard({
          name: data.name,
          userId: localStorage.getItem("userId")
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateBoardContainer
);
