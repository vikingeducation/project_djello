import React, { Component } from "react";
import Input from "./elements/Input";
import InputGroup from "./elements/InputGroup";
import Button from "./elements/Button";
import { connect } from "react-redux";
import { getUsers, setCards } from "../actions";
import { database } from "../actions/constents/database";

import serialize from "form-serialize";

class NewCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = { formUsers: [this.props.user], status: "", error: false };
  }

  addUsers = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      formUsers: [...this.state.formUsers, e.target.value]
    });
  };

  removeUsers = e => {
    e.preventDefault();

    let newFormUsers = this.state.formUsers.filter(user => {
      if (user !== e.target.value) {
        return user;
      }
      return null;
    });
    this.setState({
      ...this.state,
      formUsers: newFormUsers
    });
  };

  onSubmitting = e => {
    e.preventDefault();

    const form = e.target;
    let data = serialize(form, { hash: true });
    data.members = this.state.formUsers;
    data.listTitle = this.props.currentListTitle;
    data.user = this.props.user;
    fetch(`${database}/newCard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(results => {
        if (results.ok) {
          this.setState({
            ...this.state,
            status: `${data.title} Card Created`,
            error: false
          });
          form.reset();
          return results.json();
        } else {
          this.setState({
            ...this.state,
            status: "Error: Card Already Created",
            error: true
          });
        }
      })
      .then(oneNewCard => {
        let newCards = this.props.cards;
        newCards.push(oneNewCard.data);

        this.props.setCards(newCards.slice(), this.props.currentListTitle);
      });
  };

  componentWillMount() {
    this.props.getAllUsers();
  }

  render() {
    let usersToRender = <div />;
    if (!this.props.isFetching) {
      usersToRender = this.props.users.map(user => {
        if (this.state.formUsers.indexOf(user.username) >= 0) {
          return (
            <Button
              color="success"
              value={user.username}
              name="members"
              key={user.username}
              onClick={this.removeUsers}
            >
              {user.username}
            </Button>
          );
        }
        return (
          <Button
            color="default"
            value={user.username}
            name="members"
            key={user.username}
            onClick={this.addUsers}
          >
            {user.username}
          </Button>
        );
      });
    }
    let status = <div />;
    if (this.state.error && this.state.status) {
      status = <div className="alert alert-danger">{this.state.status}</div>;
    } else if (!this.state.error && this.state.status) {
      status = <div className="alert alert-success">{this.state.status}</div>;
    }
    return (
      <form onSubmit={this.onSubmitting}>
        {status}
        <InputGroup name="title" labelText="Title">
          <Input name="title" />
        </InputGroup>
        <InputGroup name="description" labelText="Description">
          <br />
          <textarea rows="5" name="description" />
        </InputGroup>
        <InputGroup name="members" labelText="Users Included:">
          <br />
          {usersToRender}
          <br />
        </InputGroup>
        <Button type="submit" color="primary">
          Save
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    isFetching: state.isFetching,
    user: state.user,
    currentBoard: state.currentBoard,
    cards: state.cards[ownProps.currentListTitle]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(getUsers());
    },
    setCards: (data, listName) => {
      dispatch(setCards(data, listName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCardForm);
