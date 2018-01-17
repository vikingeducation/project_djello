import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./../elements/Input";
import InputGroup from "./../elements/InputGroup";
import Button from "./../elements/Button";
import BoardElement from "./BoardElement";
import { boardAll } from "../../actions";
import CreateBoard from "./CreateBoard";

class BoardsPanel extends Component {
  componentDidMount() {
    this.props.userOne(this.props.user.id);
  }

  render() {
    let {
      user,
      boards,
      isFetching,
      onDeleteBoardClick,
      onSubmit,
      userOne
    } = this.props;
    let boardGallery = null;

    if (isFetching) {
      return <p>Fetching data...</p>;
    }

    if (boards) {
      boardGallery = boards.map(board => {
        return (
          <BoardElement
            board={board}
            key={board.id}
            onClick={onDeleteBoardClick}
            user={user}
          />
        );
      });
    }

    return (
      <div>
        <CreateBoard onSubmit={onSubmit} user={user} />
        {boardGallery}
      </div>
    );
  }
}

export default BoardsPanel;
