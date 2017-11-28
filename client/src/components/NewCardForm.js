import React, { Component } from "react";
import Input from "./elements/Input";
import InputGroup from "./elements/InputGroup";
import Button from "./elements/Button";
import { connect } from "react-redux";
import { getUsers } from "../actions";
import serialize from "form-serialize";

class NewCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = { formUsers: [] };
  }

  addUsers = e => {
    e.preventDefault();
    console.log("add", e.target.name, e.target.value);
    this.setState({ formUsers: [...this.state.formUsers, e.target.value] });
  };

  removeUsers = e => {
    e.preventDefault();
    console.log("remove", e.target.name, e.target.value);
    let newFormUsers = this.state.formUsers.filter(user => {
      if (user !== e.target.value) {
        return user;
      }
      return null;
    });
    this.setState({
      formUsers: newFormUsers
    });
  };

  onSubmitting = e => {
    e.preventDefault();

    const form = e.target;
    let data = serialize(form, { hash: true });
    data.users = this.state.formUsers;
    console.log(data);

    // form.reset()
  };

  componentWillMount() {
    this.props.getAllUsers();
  }

  render() {
    console.log("In render", this.state.formUsers);
    let formUsersRoll = this.state.formUsers;
    let usersToRender = <div />;
    if (!this.props.isFetching) {
      usersToRender = this.props.users.map(user => {
        if (this.state.formUsers.indexOf(user.username) >= 0) {
          return (
            <Button
              color="success"
              value={user.username}
              name="users"
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
            name="users"
            key={user.username}
            onClick={this.addUsers}
          >
            {user.username}
          </Button>
        );
      });
    }
    return (
      <form onSubmit={this.onSubmitting}>
        <InputGroup name="title" labelText="Title">
          <Input name="title" />
        </InputGroup>
        <InputGroup name="description" labelText="Description">
          <br />
          <textarea rows="5" name="description" />
        </InputGroup>
        <InputGroup name="users" labelText="Users Included:">
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

const mapStateToProps = state => {
  return {
    users: state.users,
    isFetching: state.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => {
      dispatch(getUsers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCardForm);
