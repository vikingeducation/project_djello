import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';

const buildMemberTable = members => {
  let memberCells = members.map(member => (
    <tr>
      <td>{member.email}</td>
      <td>Remove</td>
    </tr>   
  ))

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {memberCells}
      </tbody>
    </Table>
  )
};

class CardModal extends Component {
  constructor() {
    super()
    this.state = {
      showModal: false
    }
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = (e) => {
    this.props.onGetCard(this.props.card._id);
    this.setState({ showModal: true });
  }

  render() {
    const { currentCard } = this.props;
    let memberTable;
    memberTable = buildMemberTable(currentCard.members);

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
            <Modal.Title>{currentCard.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Description</h4>
            <p>{currentCard.description}</p>
            <hr />
            <h4>Members</h4>
            {memberTable}
            <hr />
            <h4>Activity Feed</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} bsStyle="primary">Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CardModal;