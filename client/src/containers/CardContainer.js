import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import Button from "../components/elements/Button";
import ModalCard from "../components/ModalCard";
import ModalButton from "../components/ModalButton";

import { getCards, deleteCard, changeCard, markComplete } from "../actions";
import NewCardForm from "../components/NewCardForm";
import EditableField from "../components/EditableField";
import EditableMembers from "../components/EditableMembers";

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
      let activity = card.activity.map(act => {
        return <p key={act}>{act}</p>;
      });
      return (
        <ModalCard
          title={card.complete ? card.title + ": completed" : card.title}
          description={card.description ? card.description : ""}
          darker={card.complete}
          key={card.title}
        >
          <div>
            {card.complete ? (
              <Button
                onClick={() =>
                  this.props.unmarkComplete(card.title, this.props.user)
                }
                color="dark"
              >
                Completed!
              </Button>
            ) : (
              <Button
                onClick={() =>
                  this.props.markComplete(card.title, this.props.user)
                }
                color="warning"
              >
                Complete?
              </Button>
            )}
            <p>
              Title:
              <EditableField
                currentValue={card.title}
                changeValue={this.props.changeCardTitle}
                setCurrentValue={this.props.changeCurrentCard}
                indexCurrentValue={this.props.user}
                addtionalParmas={[
                  card.description,
                  card.members,
                  this.props.user
                ]}
              />
            </p>
            <p>
              Description:{" "}
              {card.description ? (
                <EditableField
                  currentValue={card.description}
                  changeValue={this.props.changeCardDescription}
                  setCurrentValue={this.props.changeCurrentCard}
                  indexCurrentValue={this.props.user}
                  addtionalParmas={[card.title, card.members, this.props.user]}
                />
              ) : (
                ""
              )}
            </p>
            <p>
              Members:{" "}
              {members ? (
                <EditableMembers
                  currentValue={card.members}
                  changeValue={this.props.changeCardMembers}
                  setCurrentValue={this.props.changeCurrentCard}
                  indexCurrentValue={this.props.user}
                  addtionalParmas={[
                    card.title,
                    card.description,
                    this.props.user
                  ]}
                />
              ) : (
                ""
              )}
            </p>
            <p>Activity: {card.activity ? activity : ""}</p>
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
              Delete Card
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCards: (data, user) => {
      dispatch(getCards(data, user));
    },
    deleteCard: (title, list, user) => {
      dispatch(deleteCard(title, list, user));
    },
    changeCurrentCard: (w, user) => {
      dispatch(getCards(ownProps.currentList.title, user));
    },
    changeCardTitle: (oldName, newName, descriptionnewMembersUser) => {
      dispatch(
        changeCard(
          oldName,
          newName,
          descriptionnewMembersUser[0],
          descriptionnewMembersUser[1],
          ownProps.currentList.title,
          descriptionnewMembersUser[2]
        )
      );
    },
    changeCardDescription: (
      oldDescription,
      newDescription,
      titleMembersUser
    ) => {
      dispatch(
        changeCard(
          titleMembersUser[0],
          titleMembersUser[0],
          newDescription,
          titleMembersUser[1],
          ownProps.currentList.title,
          titleMembersUser[2]
        )
      );
    },
    changeCardMembers: (oldMembers, newMembers, titleDescriptionUser) => {
      dispatch(
        changeCard(
          titleDescriptionUser[0],
          titleDescriptionUser[0],
          titleDescriptionUser[1],
          newMembers,
          ownProps.currentList.title,
          titleDescriptionUser[2]
        )
      );
    },
    markComplete: (title, username) => {
      dispatch(markComplete(title, true, username, ownProps.currentList.title));
    },
    unmarkComplete: (title, username) => {
      dispatch(
        markComplete(title, false, username, ownProps.currentList.title)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
