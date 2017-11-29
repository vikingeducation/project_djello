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

    this.props.getCards(this.props.currentList.title, this.props.user);
  }
  render() {
    console.log("RENDER CARDS", this.props.cards);
    let cards = this.props.cards.map(card => {
      let members = "";
      for (var i = 0; i < card.members.length; i++) {
        console.log(card.members[i]);
        members += card.members[i] + " ";
      }
      return (
        <ModalCard
          title={card.title}
          description={card.description ? card.description : ""}
          key={card.title}
        >
          <div>
            <p>Title: {card.title}</p>
            <p>Description: {card.description}</p>
            <p>Members: {members}</p>
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
    cards: state.cards[ownProps.currentList.title],
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCards: (data, user) => {
      dispatch(getCards(data, user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
