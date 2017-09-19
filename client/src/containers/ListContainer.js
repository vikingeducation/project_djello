import React, { Component } from "react";
import BoardList from "../components/BoardList";
import { connect } from "react-redux";
import { createCard } from "../actions";

class ListContainer extends Component {
  state = {
    description: ""
  };

  handleInputChange = e => this.setState({ description: e.target.value });

  render() {
    return (
      <BoardList
        props={this.props}
        createCard={() =>
          this.props.createCard({
            description: this.state.description,
            list_id: this.props.id
          })}
        handleInputChange={this.handleInputChange}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createCard: body => {
      console.log(body);
      dispatch(createCard(body));
    }
  };
};

export default connect(null, mapDispatchToProps)(ListContainer);
