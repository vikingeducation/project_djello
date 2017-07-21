import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class CardModal extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false
    }
  }
  // getInitialState() {
  //   return { showModal: false };
  // }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  render() {
    const { card } = this.props;
    console.log(card);
    return (
      <div>
        <Button
          bsStyle="info"
          onClick={this.open}
        >
          Open Card
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{card.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Description</h4>
            <p>{card.description}</p>
            <hr />
            <h4>Members</h4>
            <hr />
            <h4>Activity Feed</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CardModal;