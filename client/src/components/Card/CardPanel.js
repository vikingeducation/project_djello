import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./../elements/Input";
import InputGroup from "./../elements/InputGroup";
import Button from "./../elements/Button";
import CardElement from "./CardElement";
import { cardShow } from "../../actions";
import CreateCard from "./CreateCard";

class CardPanel extends Component {
  componentDidMount() {
    // this.props.cardShow(1);
  }

  render() {
    let {
      user,
      lists,
      isFetching,
      onDeleteListClick,
      onSubmit,
      userOne,
      boards,
      cards
    } = this.props;
    let cardGallery = null;

    if (isFetching) {
      return <p>Fetching data...</p>;
    }

    if (lists) {
      cardGallery = cards.map(card => {
        return (
          <CardElement card={card} key={card.id} onClick={onDeleteListClick} />
        );
      });
    }

    return (
      <div>
        <CreateCard onSubmit={onSubmit} list={lists} />
        {cardGallery}
      </div>
    );
  }
}

export default CardPanel;
