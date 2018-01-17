import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./../elements/Input";
import InputGroup from "./../elements/InputGroup";
import Button from "./../elements/Button";
import ListElement from "./ListElement";
import { listShow } from "../../actions";
import CreateList from "./CreateList";

class ListsPanel extends Component {
  componentDidMount() {
    // this.props.listShow(1);
  }

  render() {
    let {
      user,
      lists,
      isFetching,
      onDeleteListClick,
      onSubmit,
      userOne,
      board
    } = this.props;
    let listGallery = null;

    if (isFetching) {
      return <p>Fetching data...</p>;
    }

    if (lists) {
      listGallery = lists.map(list => {
        return (
          <ListElement list={list} key={list.id} onClick={onDeleteListClick} />
        );
      });
    }

    return (
      <div>
        <CreateList onSubmit={onSubmit} board={board} />
        {listGallery}
      </div>
    );
  }
}

export default ListsPanel;
