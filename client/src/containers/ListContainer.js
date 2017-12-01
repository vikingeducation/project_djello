import React, { Component } from "react";
//Redux
import { connect } from "react-redux";

import ModalButton from "../components/ModalButton";
import Button from "../components/elements/Button";
import { getLists, deleteList, changeList } from "../actions";
import NewListForm from "../components/NewListForm";

import CardContainer from "./CardContainer";
import EditableField from "../components/EditableField";
import bin from "../icons/glyphicons-17-bin.png";

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
    let lists = this.props.lists.map((list, index) => {
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
              <img src={bin} alt="Delete" /> List
            </Button>
            <h4 className="card-title text-center">
              <EditableField
                currentValue={list.title}
                changeValue={this.props.changeListName}
                setCurrentValue={this.props.changeCurrentList}
                indexCurrentValue={this.props.currentBoard}
                addtionalParmas={list.description}
              />
            </h4>
            <div className="card-subtitle mb-2 text-muted text-left">
              {list.description ? (
                <EditableField
                  currentValue={list.description}
                  changeValue={this.props.changeListDescription}
                  setCurrentValue={this.props.changeCurrentList}
                  indexCurrentValue={this.props.currentBoard}
                  addtionalParmas={list.title}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <CardContainer currentList={list} />
        </div>
      );
    });
    lists.push(
      <div className="col" key="newList">
        <ModalButton key="AddCard" label="+ List">
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLists: data => {
      dispatch(getLists(data));
    },
    deleteList: (name, board) => {
      dispatch(deleteList(name, board));
    },
    changeCurrentList: (e, index) => {
      dispatch(getLists(index));
    },
    changeListName: (oldName, newName, newDescription) => {
      dispatch(
        changeList(oldName, newName, newDescription, ownProps.currentBoard)
      );
    },
    changeListDescription: (oldDescription, newDescription, title) => {
      dispatch(changeList(title, title, newDescription, ownProps.currentBoard));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
