import React, { Component } from "react";
//Redux
import { connect } from "react-redux";

import ModalCard from "../components/ModalCard";
import ModalButton from "../components/ModalButton";

import { getCards } from "../actions";
import NewCardForm from "../components/NewCardForm";

class CardContainer extends Component {
  componentWillMount() {
    //Call boards from db here

    this.props.getCards(this.props.currentList.title);
  }
  render() {
    console.log("RENDER", this.props.cards);
    let cards = this.props.cards.map(card => {
      return (
        <ModalCard
          title={card.title}
          description={card.description ? card.description : ""}
          key={card.title}
        >
          <div>
            <p>Title: {card.title}</p>
            <p>Description: {card.description}</p>
            <p>Members: {card.members}</p>
          </div>
        </ModalCard>
      );
    });
    cards.push(
      <ModalButton key="AddCard" label="Add A Card">
        <h4>New Card</h4>

        <NewCardForm currentListTitle={this.props.currentList.title} />
      </ModalButton>
    );
    return <div>{cards}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cards: state.cards[ownProps.currentList.title]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCards: data => {
      dispatch(getCards(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
