import React from "react";
import { connect } from "react-redux";
import { getAllLists } from "../actions/list";
import { getOneBoard } from "../actions/board";
import Showable from "../Components/elements/Showable";
import BoardNavContainer from "./BoardNavContainer";
import Paper from "material-ui/Paper";
import FlatButton from "material-ui/FlatButton";

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

const Board = ({ lists, newCard }) => {
  if (!lists) return null;

  return (
    <div>
      {lists.map(list => (
        <List key={list._id} newCard={e => newCard(e, list._id)} {...list} />
      ))}
    </div>
  );
};
const List = ({ props, newCard }) => {
  const cards = props.cards.map(card => <Card key={card._id} {...card} />);
  return (
    <Paper style={style}>
      <h5>{props.title}</h5>
      <ul>{cards}</ul>
      <FlatButton onClick={newCard} label="New" />
    </Paper>
  );
};
const Card = props => {
  return (
    <Paper style={paperStyle}>
      <p>{props.title}</p>
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
  onNewCard = (e, listId) => {
    console.log("making new card");
    console.log("e.target", e.target, "\n list = ", listId);
  };
  componentDidMount = async () => {
    //TODO: grab the user
    console.log("mounting boardShow");
    console.log("boardId = ", this.state.boardId);
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
        <Board newCard={this.onNewCard} lists={this.props.lists} />
      </Showable>
    );
  }
}

const mapStateToProps = state => {
  console.log("state of lists, = ", state);
  return {
    ...state.board,
    ...state.list
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllLists: (userId, boardId) => {
      dispatch(getAllLists(userId, boardId));
    },
    getOneBoard: (boardId, userId) => {
      dispatch(getOneBoard(boardId, userId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardShowContainer);
