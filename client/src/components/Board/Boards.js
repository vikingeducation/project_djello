import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./../elements/Input";
import InputGroup from "./../elements/InputGroup";
import Button from "./../elements/Button";
import BoardElement from "./../elements/BoardElement";
import { boardAll } from "../../actions";

class Boards extends Component {
  render() {
    if (this.props.isFetching) {
      return <p>Fetching data...</p>;
    }
    const { boards, error, onClick } = this.props;
    let boardGallery = boards.map(board => {
      return <BoardElement board={board} key={board.id} onClick={onClick} />;
    });
    return <div>{boardGallery}</div>;
  }
}

export default Boards;
