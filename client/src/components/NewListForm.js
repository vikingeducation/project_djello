import React, { Component } from "react";
import Input from "./elements/Input";
import InputGroup from "./elements/InputGroup";
import Button from "./elements/Button";
import serialize from "form-serialize";
import { connect } from "react-redux";
import { setLists } from "../actions";

class NewListForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.state, status: "", error: false };
  }

  onSubmitting = e => {
    e.preventDefault();

    const form = e.target;
    let data = serialize(form, { hash: true });
    data.boardname = this.props.currentBoard;
    fetch("https://desolate-temple-73642.herokuapp.com/newList", {
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
            status: `${data.title} List Created`,
            error: false
          });
          form.reset();
          return results.json();
        } else {
          this.setState({
            ...this.state,
            status: "Error: List Already Created",
            error: true
          });
        }
      })
      .then(oneNewList => {
        let newLists = this.props.lists;
        newLists.push(oneNewList.data);
        this.props.setLists(newLists.slice());
      });
  };

  render() {
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
        <Button type="submit" color="primary">
          Save
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentBoard: state.currentBoard,
    lists: state.lists,
    cards: state.cards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLists: data => {
      dispatch(setLists(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewListForm);
