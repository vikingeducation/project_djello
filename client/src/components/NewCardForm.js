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
  toggleUsers = e => {
    e.preventDefault();
    console.log("check?", e.target.id, e.target.checked);
    if (!e.target.checked) {
      let newFormUsers = this.state.formUsers.filter(user => {
        if (user !== e.target.id) {
          return user;
        }
        return null;
      });
      this.setState({
        formUsers: newFormUsers
      });
    } else {
      this.setState({
        formUsers: [...this.state.formUsers, e.target.id]
      });
    }
  };

  onSubmitting = e => {
    e.preventDefault();

    const form = e.target;
    const data = serialize(form, { hash: true });
    console.log(data);

    // form.reset()
  };

  componentWillMount() {
    this.props.getAllUsers();
  }

  componentWillUpdate() {
    console.log("check in componentWillUpdate", this.state.formUsers);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("check in componentDidUpdate", this.state.formUsers);
    if (prevState.formUsers !== this.state.formUsers) {
      // this.setState({ formUsers: [this.state.formUsers] });
    }
  }

  render() {
    console.log("In render", this.state.formUsers);
    let usersToRender = <div />;
    if (!this.props.isFetching) {
      usersToRender = this.props.users.map(user => {
        return (
          <div key={user.username}>
            <input
              name="users"
              type="checkbox"
              id={user.username}
              value={user.username}
              onClick={this.toggleUsers}
              checked={this.state.formUsers.includes(user.username)}
            />
            <label htmlFor={user.username}>{user.username}</label>
          </div>
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
        {usersToRender}
        <input type="submit" color="primary" />
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
