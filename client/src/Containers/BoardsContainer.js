import React from "react";

class BoardsContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("board props = ", this.props);
    return (
      <div>
        {/* <h1>Username: {this.props.user.username}</h1> */}
        <p>Welcome!</p>
      </div>
    );
  }
}
export default BoardsContainer;
