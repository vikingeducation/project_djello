import React, { Component } from "react";
import Input from "./elements/Input";
import InputGroup from "./elements/InputGroup";
import Button from "./elements/Button";
import serialize from "form-serialize";
import ModalButton from "../components/ModalButton";
import { connect } from "react-redux";
import { setBoards } from "../actions";

class NewBoardForm extends Component {
  constructor(props) {
    super(props);
    this.state = { status: "", error: false };
  }

  onSubmitting = e => {
    e.preventDefault();

    const form = e.target;
    let data = serialize(form, { hash: true });
    fetch("/newBoard", {
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
            status: `${data.title} Board Created`,
            error: false
          });

          form.reset();
          return results.json();
        } else {
          this.setState({
            status: "Error: Board Already Created",
            error: true
          });
        }
      })
      .then(oneNewBoard => {
        let newBoards = this.props.boards;
        newBoards.push(oneNewBoard.data);
        this.props.setBoards(newBoards.slice());
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
      <ModalButton size={this.props.size} key="NewBoard" label="+ Board">
        <form onSubmit={this.onSubmitting}>
          <h4>New Board</h4>
          {status}
          <InputGroup name="title" labelText="Title">
            <Input name="title" />
          </InputGroup>
          <Button type="submit" color="primary">
            Save
          </Button>
        </form>
      </ModalButton>
    );
  }
}
const mapStateToProps = state => {
  return {
    boards: state.boards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBoards: data => {
      dispatch(setBoards(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewBoardForm);
