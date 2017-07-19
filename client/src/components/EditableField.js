import React, { Component } from 'react';
import {FormControl, Button} from 'react-bootstrap';

class EditableField extends Component {
  constructor() {
    super();
    this.state = {
      isEditOpen: false
    };
  }

  onClick = e => {
    console.log('fuck');
    if (!this.state.isEditOpen) {
      this.setState({
        isEditOpen: true
      })
    }
  };

  onBlur = e => {
    this.setState({
      isEditOpen: false
    })
  }

  onCancel = e => {
    e.preventDefault();
    this.setState({
      isEditOpen: false
    })
  }

  render() {
    const form = (
      <form onBlur={this.onBlur}>
        <FormControl 
          type="text"
        />
        <br />
        <Button type="submit" bsStyle="success">
          Submit Changes
        </Button>
        <Button bsStyle="danger" onClick={this.onCancel}>
          Cancel
        </Button>
      </form>
    )
    return (
      <div onClick={this.onClick}>
        {this.state.isEditOpen ? form : this.props.children}
      </div>
    );
  }
}

export default EditableField;