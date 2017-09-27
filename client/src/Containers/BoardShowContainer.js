import React from "react";
import { connect } from "react-redux";
import {
  updateList,
  getAllLists,
  deleteList,
  createList
} from "../actions/list";
import { createCard } from "../actions/card";
import { getOneBoard } from "../actions/board";
import Showable from "../Components/elements/Showable";
import Editable from "../Components/Editable";
import Board from "../Components/Board";
import BoardNavContainer from "./BoardNavContainer";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

const loadingScreen = <div>Loading...</div>;

const style = {
  width: 300,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};
const paperStyle = {
  margin: 5
};
const hidden = {
  display: "none"
};

class BoardShowContainer extends React.Component {
  constructor(props) {
    super(props);
    // console.log("location = ", this.props.location);
    //TODO: reconsider this method of setting the boardId
    let location = this.props.location.pathname.split("/")[2];
    this.state = {
      boardId: location,
      loaded: false
    };
    const user = {
      username: "a",
      password: "a"
    };
  }
  onNewCard = async (e, listId) => {
    e.stopPropagation();
    e.preventDefault();
    //make a card
    let card = await this.props.createCard(listId, e.target.value);
  };
  onNewList = e => {
    console.log("making new list");
    console.log("e.target", e.target);
    e.stopPropagation();
    e.preventDefault();
    this.props.createList(this.props.board._id, null); //change
  };
  onDeleteList = (e, listId) => {
    console.log("deleting a list");
    console.log("e.target", e.target, "\n list = ", listId);
    e.stopPropagation();
    e.preventDefault();
    //attempting things test
    this.props.deleteList(listId);
  };
  onDeleteCard = (e, cardId) => {
    console.log("making new list");
    console.log("e.target", e.target, "\n list = ", cardId);
    e.stopPropagation();
    e.preventDefault();
    // let headers = new Headers();
    // headers.append("Content-type", "application/json");
    // fetch(`/cards/${cardId}`, {
    //   headers,
    //   method: "DELETE",
    //   body: null
    // });
  };
  onEditList = (e, listId) => {
    e.stopPropagation();
    e.preventDefault();
    //DO THE REQUEST
    let oldList = this.props.lists.find(list => list._id === listId);
    oldList[e.target.name] = e.target.value;
    this.props.updateList(oldList);
  };
  componentDidMount = async () => {
    //TODO: grab the user
    console.log("mounting boardShow");
    // console.log("boardId = ", this.state.boardId);
    const user = {
      username: "a",
      password: "a"
    };
    this.props.getOneBoard(this.state.boardId, user.username);
    this.props.getAllLists(user.username, this.state.boardId);
  };
  render() {
    console.log("boardShow props = ", this.props);
    return (
      <Showable isFetching={this.props.isFetching}>
        <BoardNavContainer />
        <Board
          newCard={this.onNewCard}
          newList={this.onNewList}
          lists={this.props.lists}
          deleteList={this.onDeleteList}
          deleteCard={this.onDeleteCard}
          edit={this.onEditList}
        />
      </Showable>
    );
  }
}

const mapStateToProps = state => {
  console.log("state of lists, = ", state);
  return {
    ...state.board,
    ...state.list,
    userId: state.user.username
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllLists: (userId, boardId) => {
      dispatch(getAllLists(userId, boardId));
    },
    createList: (boardId, name) => {
      dispatch(createList(boardId, name));
    },
    deleteList: listId => {
      dispatch(deleteList(listId));
    },
    updateList: list => {
      dispatch(updateList(list));
    },
    getOneBoard: (boardId, userId) => {
      dispatch(getOneBoard(boardId, userId));
    },
    createCard: (listId, title) => {
      dispatch(createCard(listId, title));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardShowContainer);
