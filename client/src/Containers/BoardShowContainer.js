import React from "react";
import { connect } from "react-redux";
import { getAllLists } from "../actions/list";
import { getOneBoard } from "../actions/board";
import Showable from "../Components/elements/Showable";
import BoardNavContainer from "./BoardNavContainer";
const loadingScreen = <div>Loading...</div>;

const BoardNav = ({ board }) => {
  return (
    <div>
      <h1>{board.title}</h1>
    </div>
  );
};
const Board = ({ board, lists }) => {
  const listsComponents = lists.map(list => <List key={list._id} {...list} />);
  return (
    <div>
      <h1>Board: {board.title}</h1>
      <ul>{listsComponents}</ul>
    </div>
  );
};
const List = props => {
  const cards = props.cards.map(card => <Card key={card._id} {...card} />);
  return (
    <div>
      <h5>List: {props.title}</h5>
      <ul>{cards}</ul>
    </div>
  );
};
const Card = props => {
  return (
    <div>
      <h5>Card: {props.title}</h5>
    </div>
  );
};

class BoardShowContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log("location = ", this.props.location);
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
    let boardComponent;
    let boardNavComponent;
    if (!this.state.loaded) {
      if (this.props.board && this.props.lists) {
        this.setState({ loaded: true });
      }
      boardComponent = null;
      boardNavComponent = null;
    } else {
      boardComponent = (
        <Board board={this.props.board} lists={this.props.lists} />
      );
      boardNavComponent = <BoardNavContainer />; //<BoardNav board={this.props.board} />;
    }

    return (
      <Showable isFetching={this.props.isFetching}>
        {boardNavComponent}
        {boardComponent}
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
