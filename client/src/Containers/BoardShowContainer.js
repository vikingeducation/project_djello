import React from "react";

class BoardShowContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("board props = ", this.props);
    const boards = this.props.user.boards;
    return (
      <div>
        {/* <h1>Username: {this.props.user.username}</h1> */}
        <h1>Nav Bar for a Board</h1>
        <p>Board show page </p>
      </div>
    );
  }
}
export default BoardShowContainer;
