import React, { Component } from "react";
import BoardList from "../components/BoardList";
import { connect } from "react-redux";
import { createCard } from "../actions";

class ListContainer extends Component {
  state = {
    description: ""
  };

  componentDidMount = async () => {};

  handleInputChange = e => this.setState({ description: e.target.value });

  render() {
    console.log(this.props);
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
      dispatch(createCard(body));
    }
  };
};

export default connect(null, mapDispatchToProps)(ListContainer);
