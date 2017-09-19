import React, { Component } from "react";
import { connect } from "react-redux";

import { CardsActions } from "../actions";
import List from "../components/List";

class ListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };
  }

  componentWillMount() {
    const { cardsGet } = this.props;
    cardsGet();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cards: nextProps.CardsReducers.cardsData
    });
  }

  render() {
    console.log("this.props: ", this.props);
    return <List list={this.props.list} cards={this.state.cards} />;
  }
}

const mapStateToProps = state => {
  return {
    CardsReducers: state.CardsReducers
  };
};

const mapDispatchToProps = dispatch => ({
  cardsGet: () => {
    dispatch(CardsActions.cardsGet());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
