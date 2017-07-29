import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";

class EditableField extends Component {
  constructor() {
    super();
    this.state = {
      isEditOpen: false
    };
  }

  onClick = e => {
    if (!this.state.isEditOpen) {
      this.setState({
        isEditOpen: true
      });
    }
  };

  onBlur = e => {
    let eventRelatedTarget = e.relatedTarget || {};
    if (eventRelatedTarget.type !== "submit") {
      this.setState({
        isEditOpen: false
      });
    }
  };

  onCancel = e => {
    e.preventDefault();
    this.setState({
      isEditOpen: false
    });
  };

  handleSubmit = e => {
    this.props.onSubmit(e);
    this.setState({
      isEditOpen: false
    });
  };

  render() {
    const { fieldName } = this.props;
    const form = (
      <div>
        <form onSubmit={this.handleSubmit} onBlur={this.onBlur}>
          <FormControl type="text" name={fieldName} autoFocus />
          <br />
          <Button type="submit" bsStyle="success">
            Submit Changes
          </Button>
          <br />
          <Button bsStyle="danger" onClick={this.onCancel}>
            Cancel
          </Button>
        </form>
      </div>
    );

    return (
      <div onClick={this.onClick}>
        {this.state.isEditOpen ? form : this.props.children}
      </div>
    );
  }
}

export default EditableField;
