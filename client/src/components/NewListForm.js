import React, { Component } from "react";
import Input from "./elements/Input";
import InputGroup from "./elements/InputGroup";
import Button from "./elements/Button";
import serialize from "form-serialize";

class NewCardForm extends Component {
  onSubmitting = e => {
    e.preventDefault();

    const form = e.target;
    const data = serialize(form, { hash: true });
    console.log(data);

    // form.reset()
  };

  render() {
    return (
      <form onSubmit={this.onSubmitting}>
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

export default NewCardForm;
