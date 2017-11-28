import React, { Component } from "react";
import Modal from "./elements/Modal";
import Button from "./elements/Button";

class ModalButton extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div className="ModalButton">
        <Button color="primary" onClick={this.toggleModal}>
          {this.props.label ? this.props.label : "Click Me"}
        </Button>

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default ModalButton;
