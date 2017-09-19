import React, { Component } from "react";
import BoardsModal from "./BoardsModal";

const style = {
  width: "100%",
  display: "flex",
  height: 100,
  border: "1px solid black"
};

class Card extends Component {
  state = {
    modalOpen: false
  };

  handleClose = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {
    return (
      <div style={style} onClick={this.handleClose}>
        <h3>
          {this.props.description}
        </h3>
        {this.state.modalOpen
          ? <BoardsModal
              open={this.state.modalOpen}
              onRequestClose={this.handleClose}
            />
          : null}
      </div>
    );
  }
}

export default Card;
