import React, { Component } from "react";
//Redux
import { connect } from "react-redux";

import ModalButton from "../components/ModalButton";
import Button from "../components/elements/Button";
import { getLists, deleteList } from "../actions";
import NewListForm from "../components/NewListForm";

import CardContainer from "./CardContainer";

class ListContainer extends Component {
  componentWillMount() {
    //Call boards from db here
    this.props.getLists(this.props.currentBoard);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBoard !== this.props.currentBoard) {
      this.props.getLists(nextProps.currentBoard);
    }
    if (nextProps.lists.length !== this.props.lists.length) {
      this.props.getLists(nextProps.currentBoard);
    }
  }
  render() {
    let lists = this.props.lists.map(list => {
      return (
        <div className="col-4 card" key={list.title}>
          <div className="card-header text-left" key="header">
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                this.props.deleteList(list.title, this.props.currentBoard);
                console.log("Delete", list.title);
              }}
            >
              Delete List
            </Button>
            <h4 className="card-title text-center">{list.title}</h4>
            <div className="card-subtitle mb-2 text-muted text-left">
              {list.description}
            </div>
          </div>
          <CardContainer currentList={list} />
        </div>
      );
    });
    lists.push(
      <div className="col" key="newList">
        <ModalButton key="AddCard" label="Add A List">
          <h4>New List</h4>
          <NewListForm />
        </ModalButton>
      </div>
    );
    return <div className="row">{lists}</div>;
  }
}

const mapStateToProps = state => {
  return {
    currentBoard: state.currentBoard,
    lists: state.lists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLists: data => {
      dispatch(getLists(data));
    },
    deleteList: (name, board) => {
      dispatch(deleteList(name, board));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
