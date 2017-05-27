/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";

import { connect } from "react-redux";
import CreateListModal from "../components/CreateListModal";
import { createNewList } from "../actions/boards";
import serialize from "form-serialize";

class CreateListContainer extends React.Component {
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
      <CreateListModal
        {...this.props}
        toggle={this.toggle}
        modal={this.state.modal}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    boardId: state.boards.currentBoard.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmitList: boardId => e => {
      e.preventDefault();
      const form = e.target;
      const data = serialize(form, { hash: true });
      dispatch(
        createNewList({
          title: data.title,
          boardId,
          description: data.description
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateListContainer
);
