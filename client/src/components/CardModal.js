import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Table, Button, Modal } from 'react-bootstrap';
import EditableField from "./EditableField";

const buildAddUserOptions = (cardMembers, allUsers) => {
  let options = [];

  allUsers.forEach(user => {
    let shouldAdd = true;
    cardMembers.forEach(cardMember => {
      if (cardMember._id === user.id) {
        shouldAdd = false;
      }
    });

    if (shouldAdd) {
      options.push(user);
    }
  });
  return options.map(user => (
    <option key={user.id} value={user.id}>{user.email}</option>
  ));
};

const buildActivityFeed = activities => {
  return activities.map(activity => {
    return (
      <p key={activity._id}>{activity.description} Date: {new Date(activity.createdAt).toLocaleString()}</p>
    )
  });
}

const buildMemberTable = members => {
  let memberCells = members.map(member => (
    <tr key={member.email}>
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
    const { currentCard, allUsers, onUserAdd } = this.props;
    let memberTable = buildMemberTable(currentCard.members);
    let activitiesFeed = buildActivityFeed(currentCard.activities);
    let addUserOptions = buildAddUserOptions(currentCard.members, allUsers);

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
          <Modal.Title>
            <EditableField fieldName="title" onSubmit={this.props.onUpdateCard}>
              {currentCard.title}
            </EditableField>
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Description</h4>
            <EditableField fieldName="description" onSubmit={this.props.onUpdateCard}>
              <p>{currentCard.description}</p>
            </EditableField>
            <hr />
            <h4>Members</h4>
            {memberTable}
            <form onSubmit={onUserAdd}>
              <FormGroup controlId="selectedBoard">
              <ControlLabel>Add a member:</ControlLabel>
              <FormControl
                componentClass="select"
                name="newMember"
              >
                {addUserOptions}
              </FormControl>

              <br />

              <Button block bsStyle="success" type="submit">Add</Button>
            </FormGroup>
            </form>
            <hr />
            <h4>Activity Feed</h4>
            {activitiesFeed}
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