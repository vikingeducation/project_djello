import React from "react";
import { connect } from "react-redux";

//REDUX RESOURCES
import { getOneBoard } from "../actions/board";
import {
  updateList,
  getAllLists,
  deleteList,
  createList
} from "../actions/list";
import { createCard, updateCard } from "../actions/card";

//COMPONENTS
import Showable from "../Components/elements/Showable";
import Board from "../Components/BoardShowComponents/Board";
import BoardNavContainer from "./BoardNavContainer";

const style = {
  width: 300,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};
// const paperStyle = {
//   margin: 5
// };
// const hidden = {
//   display: "none"
// };

class BoardShowContainer extends React.Component {
  constructor(props) {
    super(props);
    //TODO: reconsider this method of setting the boardId
    let location = this.props.location.pathname.split("/")[2];
    this.state = {
      boardId: location,
      loaded: false
    };
  }
  onNewCard = async (e, listId) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.createCard(listId, e.target.value);
  };
  onNewList = e => {
    e.stopPropagation();
    e.preventDefault();
    this.props.createList(this.props.board._id, null); //change
  };
  onDeleteList = (e, listId) => {
    e.stopPropagation();
    e.preventDefault();
    this.props.deleteList(listId);
  };
  onDeleteCard = (e, cardId) => {
    e.stopPropagation();
    e.preventDefault();
    //delete the card
  };
  onEditList = (e, listId) => {
    e.stopPropagation();
    e.preventDefault();
    //
    let oldList = this.props.lists.find(list => list._id === listId);
    oldList[e.target.name] = e.target.value;
    this.props.updateList(oldList);
  };
  onEditCard = (e, cardId, listId) => {
    console.log("you changed something");
    console.log(`${cardId} and ${e.target.value}, ${listId}`);
    //find and update the appropriate card
    let list = this.props.lists.find(list => list._id === listId);
    let oldCard = list.cards.find(card => card._id === cardId);
    console.log("oldCard = ", oldCard);
    //TODO: old card is already changed???
    oldCard[e.target.name] = e.target.value;
    this.props.editCard(oldCard._id, oldCard);
  };
  componentWillReceiveProps = async nextProps => {
    const nextLocation = nextProps.location.pathname.split("/")[2];
    if (this.state.boardId !== nextLocation) {
      //on changing to view a different board
      this.setState({ loaded: false, boardId: nextLocation });
      this.props.getOneBoard(nextLocation, this.props.userId);
      this.props.getAllLists(this.props.userId, nextLocation);
    } else if (!this.state.loaded) {
      //if we have a board and it's lists we're loaded
      if (nextProps.board && nextProps.lists) {
        this.setState({ loaded: true });
      }
    }
  };
  //hydrate some data
  componentDidMount = async () => {
    this.props.getOneBoard(this.state.boardId, this.props.userId);
    this.props.getAllLists(this.props.userId, this.state.boardId);
  };

  render = () => {
    if (!this.state.loaded) return <div>Loading</div>;
    return (
      <div>
        <BoardNavContainer userId={this.props.userId} />
        <Board
          newCard={this.onNewCard}
          newList={this.onNewList}
          lists={this.props.lists}
          deleteList={this.onDeleteList}
          deleteCard={this.onDeleteCard}
          editList={this.onEditList}
          editCard={this.onEditCard}
        />
      </div>
    );
  };
}

const mapStateToProps = state => {
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
    },
    editCard: (cardId, updatedCard) => {
      dispatch(updateCard(cardId, updatedCard));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardShowContainer);
