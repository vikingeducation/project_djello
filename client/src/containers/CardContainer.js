import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import Button from "../components/elements/Button";
import ModalCard from "../components/ModalCard";
import ModalButton from "../components/ModalButton";

import { getCards, deleteCard } from "../actions";
import NewCardForm from "../components/NewCardForm";

class CardContainer extends Component {
  componentWillMount() {
    //Call boards from db here

    this.props.getCards(this.props.currentList.title, this.props.user);
  }
  render() {
    let cards = this.props.cards.map(card => {
      let members = "";
      for (var i = 0; i < card.members.length; i++) {
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
            <Button
              color="danger"
              size="sm"
              onClick={() => {
                this.props.deleteCard(
                  card.title,
                  this.props.currentList.title,
                  this.props.user
                );
                console.log("Delete", card.title);
              }}
            >
              Delete List
            </Button>
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
    },
    deleteCard: (title, list, user) => {
      dispatch(deleteCard(title, list, user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
