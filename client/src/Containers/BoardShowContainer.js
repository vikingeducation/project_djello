import React from "react";

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
  render() {
    console.log("board props = ", this.props);
    const boards = this.props.boards;
    const board = boards[0];
    return (
      <div>
        {/* <h1>Username: {this.props.user.username}</h1> */}
        <h1>Nav Bar for a Board</h1>
        {<BoardNav {...board} />}
        <Board {...board} />
        <p>Board show page </p>
      </div>
    );
  }
}
export default BoardShowContainer;
