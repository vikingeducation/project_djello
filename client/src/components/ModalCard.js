import React, { Component } from "react";
import Modal from "./elements/Modal";
import Button from "./elements/Button";

class ModalCard extends Component {
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
      <div className="ModalCard text-center" onClick={this.toggleModal}>
        <div className="card subcard" key={this.props.title}>
          <p>{this.props.title}</p>
          <p>{this.props.description}</p>
        </div>

        <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default ModalCard;
