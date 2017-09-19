import React, { Component } from "react";
import Card from "./Card";

const styles = {
  height: 500,
  width: 200,
  border: "1px solid black",
  display: "flex",
  flexWrap: "wrap"
};

class BoardList extends Component {
  state = {
    inputVal: ""
  };

  handleInputChange = e => this.setState({ description: e.target.value });

  render() {
    const createCard = this.props.createCard;
    return (
      <div style={styles}>
        <p>
          {this.props.props.title}
        </p>
        <div>
          {this.props.props.cards.map(card =>
            <Card description={card.description} key={card._id} />
          )}
        </div>
        <div>
          <input type="text" onChange={this.handleInputChange} />
          <button
            onClick={() =>
              createCard({
                description: this.state.description,
                list_id: this.props.props.id
              })}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default BoardList;
