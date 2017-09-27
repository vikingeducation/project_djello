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

//TODO: move these components out into their own files

const Board = ({ lists, newCard, newList, deleteList, deleteCard, edit }) => {
  if (!lists) return null;
  // console.log("board props = ", lists, newCard);
  return (
    <div>
      {lists.map(list => (
        <List
          {...list}
          key={list._id}
          id={list._id}
          newCard={e => newCard(e, list._id)}
          deleteList={e => deleteList(e, list._id)}
          deleteCard={deleteCard}
          title={list.title}
          description={list.description}
          edit={e => edit(e, list._id)}
        />
      ))}
      <NewList id="newBtn" newList={newList} />
    </div>
  );
};

const NewList = ({ cards, newList }) => {
  return (
    <Paper style={style}>
      <FlatButton onClick={newList} label="New" />
    </Paper>
  );
};
const blur = e => {
  console.log("blurring", e.target);
};

//TODO: ONBLUR EMPTY OUT THE TEXTFIELD
const List = ({
  cards,
  newCard,
  deleteList,
  deleteCard,
  edit,
  title,
  description
}) => {
  const cardComponents = cards.map(card => <Card key={card._id} {...card} />);
  return (
    <Paper style={style}>
      <Editable name="title" onSubmit={edit} text={title}>
        <h5>{title}</h5>
      </Editable>
      <Editable name="description" onSubmit={edit} text={description}>
        <h5>{description}</h5>
      </Editable>
      <ul>{cardComponents}</ul>
      <FlatButton onClick={newCard} label="New" />
      <div>
        <FlatButton onClick={deleteList}>
          <i className="material-icons">delete</i>
        </FlatButton>
      </div>
    </Paper>
  );
};
const Card = props => {
  return (
    <Paper style={paperStyle}>
      <p>{props.title}</p>
      {/* <FlatButton onClick={props.deleteCard}>
        <i className="material-icons">delete</i>
      </FlatButton> */}
    </Paper>
  );
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
    console.log("making new card");
    console.log("e.target", e.target, "\n list = ", listId);
    e.stopPropagation();
    e.preventDefault();
    //make a card
    let card = await this.props.createCard(listId);
    console.log("card = ", card);
    // const user = {
    //   username: "a",
    //   password: "a"
    // };
    // this.props.getOneBoard(this.state.boardId, user.username);
    // this.props.getAllLists(user.username, this.state.boardId);

    //tell the server
    //refresh the page??
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
    console.log("received data, ", e.target.value);
    console.log("received data from , ", e.target.name);
    e.stopPropagation();
    e.preventDefault();
    //DO THE REQUEST
    console.log("found oldList = ", oldList);
    let oldList = this.props.lists.find(list => list._id === listId);
    console.log("found oldList = ", oldList);
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
    createCard: card => {
      dispatch(createCard(card));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardShowContainer);
