import React from "react";
import { connect } from "react-redux";
import { getAllLists } from "../actions/list";

import Showable from "../Components/elements/Showable";

const loadingScreen = <div>Loading...</div>;

const BoardNav = props => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};
const Board = props => {
  const lists = props.lists.map(list => <List key={list._id} {...list} />);
  return (
    <div>
      <h1>Board: {props.title}</h1>
      <ul>{lists}</ul>
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
  }
  componentDidMount = async () => {
    //TODO: grab the user
    console.log("mounting boardShow");
    const user = {
      username: "a",
      password: "a"
    };
    // let data = await this.props.getAllBoards(user);
    this.props.getAllLists(user.username, this.props.board._id);
  };
  render() {
    console.log("boardShow props = ", this.props);
    // const boards = this.props.boards;
    // const board = boards[0];
    const boards = null;
    const board = null;
    return (
      <div>
        {/* <h1>Username: {this.props.user.username}</h1> */}
        <h1>Nav Bar for a Board</h1>
        {/* {<BoardNav {...board} />}
        <Board {...board} /> */}
        <p>Board show page </p>
        <Showable>
          <p>things</p>
        </Showable>
      </div>
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
    getAllLists: userId => {
      dispatch(getAllLists(userId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardShowContainer);
