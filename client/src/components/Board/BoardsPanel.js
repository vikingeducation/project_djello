import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./../elements/Input";
import InputGroup from "./../elements/InputGroup";
import Button from "./../elements/Button";
import Boards from "./Boards";
import { boardAll, boardDelete } from "../../actions";

class BoardsPanel extends Component {
  componentDidMount() {
    this.props.getBoards();
  }

  render() {
    const { user, boards, isFetching, onDeleteBoardClick } = this.props;
    return (
      <Boards
        boards={boards}
        isFetching={isFetching}
        onClick={onDeleteBoardClick}
      />
    );
  }
}

export default BoardsPanel;
