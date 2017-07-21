import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Table,
  Button,
  Modal
} from "react-bootstrap";
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
  return options.map(user =>
    <option key={user.id} value={user.id}>{user.email}</option>
  );
};

const buildActivityFeed = activities => {
  return activities.map(activity => {
    return (
      <p key={activity._id}>
        {activity.description} Date:{" "}
        {new Date(activity.createdAt).toLocaleString()}
      </p>
    );
  });
};

const buildMemberTable = (members, onUserRemove) => {
  let memberCells = members.map(member =>
    <tr key={member.email}>
      <td>{member.email}</td>
      <td>
        <Button bsStyle="danger" onClick={e => onUserRemove(e, member._id)}>
          Remove
        </Button>
      </td>
    </tr>
  );

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {memberCells}
      </tbody>
    </Table>
  );
};

class CardModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  onDelete = e => {
    e.preventDefault();
    this.setState({ showModal: false });
    this.props.onMarkComplete();
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = e => {
    this.props.onGetCard(this.props.card._id);
    this.setState({ showModal: true });
  };

  render() {
    const { currentCard, allUsers, onUserAdd, onUserRemove } = this.props;
    let memberTable = buildMemberTable(currentCard.members, onUserRemove);
    let activitiesFeed = buildActivityFeed(currentCard.activities);
    let addUserOptions = buildAddUserOptions(currentCard.members, allUsers);

    return (
      <div>
        <Button block bsStyle="info" onClick={this.open}>
          Open Card
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              <EditableField
                fieldName="title"
                onSubmit={this.props.onUpdateCard}
              >
                {currentCard.title}
              </EditableField>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Description</h4>
            <EditableField
              fieldName="description"
              onSubmit={this.props.onUpdateCard}
            >
              <p>{currentCard.description}</p>
            </EditableField>
            <hr />
            <h4>Members</h4>
            {memberTable}
            <form onSubmit={onUserAdd}>
              <FormGroup controlId="selectedBoard">
                <ControlLabel>Add a member:</ControlLabel>
                <FormControl componentClass="select" name="newMember">
                  {addUserOptions}
                </FormControl>

                <br />

                <Button block bsStyle="success" type="submit">Add</Button>
              </FormGroup>
            </form>
            <hr />
            <h4>Activity Feed</h4>
            {activitiesFeed}
            <hr />
            <Button
              block
              onClick={this.onDelete}
              bsSize="large"
              bsStyle="primary"
            >
              Mark Card Completed
            </Button>
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
